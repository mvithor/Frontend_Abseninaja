import React, { useEffect, useState, Suspense } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alerts from 'src/components/alerts/Alerts';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BcSiswaList from 'src/components/apps/siswa/siswaList/BcSiswaList';
import StudentTable from 'src/components/apps/siswa/siswaList/StudentTable';

export default function StudentsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/students');
        setStudents(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          console.log(error.response.data);
          setError(error.response.data.msg);
        } else {
          console.error("Terjadi kesalahan:", error.message);
          setError("Terjadi kesalahan saat memuat data");
        }
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/kelas/nama-kelas');
        setClasses(response.data); // Fill classes state with the fetched data
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Terjadi kesalahan saat memuat data kelas');
      }
    };

    fetchStudents();
    fetchClasses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/siswa/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data siswa:', error.message);
      setError('Terjadi kesalahan saat menghapus data siswa');
    }
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteStudentId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const studentsWithClassNames = students.map((student) => {
    const studentClass = classes.find((cls) => cls.id === student.kelas_id);
    return {
      ...student,
      kelas_nama: studentClass ? studentClass.nama_kelas : 'Tidak Diketahui',
    };
  });

  const filteredStudents = studentsWithClassNames
    .filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Data Siswa" description="Data Siswa">
      <BcSiswaList />
      <Alerts error={error}/>
      <ParentCard title="Data Siswa">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              sx: { padding: '4px' },
            }}
          />
        </Box>
        <Suspense fallback={<div>Loading...</div>}>
          <StudentTable
            students={filteredStudents}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handlePageChange}
            handleChangeRowsPerPage={handleRowsPerPageChange}
            handleEdit={handleEdit}
            handleDelete={handleOpenConfirmDialog}
          />
        </Suspense>
      </ParentCard>
      {/* Dialog Konfirmasi Hapus */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
            Apakah Anda yakin ingin menghapus data siswa?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button
            sx={{ mr: 3 }}
            variant="outlined"
            color="secondary"
            onClick={handleCloseConfirmDialog}
          >
            Batal
          </Button>
          <Button
            sx={{
              mr: 3,
              backgroundColor: '#F48C06',
              '&:hover': { backgroundColor: '#f7a944' },
            }}
            variant="contained"
            onClick={() => handleDelete(deleteStudentId)}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
