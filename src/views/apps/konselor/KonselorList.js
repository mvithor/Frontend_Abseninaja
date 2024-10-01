import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import { IconUserPlus } from "@tabler/icons";
import BcKonselorList from 'src/components/apps/konselor/konselorList/BcKonselorList';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Alerts from 'src/components/alerts/Alerts';
import KonselorTable from 'src/components/apps/konselor/konselorList/KonselorTable';

const KonselorList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [konselor, setKonselor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [deleteKonselor, setDeleteKonselor] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKonselor = async () => {
      try {
        const response = await axiosInstance.get('/konselor');
        setKonselor(response.data);
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
    fetchKonselor();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredKonselor = konselor
    .filter((konselor) =>
      konselor.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama.localeCompare(b.nama));

  const handleAddKonselor = () => {
    navigate('/dashboard/admin/konselor/tambah-konselor');
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/konselor/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/konselor/${id}`);
      setKonselor(konselor.filter((konselor) => konselor.id !== id));
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data konselor:', error.message);
      setError('Terjadi kesalahan saat menghapus data konselor');
    }
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteKonselor(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <PageContainer title="Data Konselor" description="Data Konselor">
        <BcKonselorList />
        <Alerts error={error}/>
      <ParentCard title="Data Konselor">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              sx: { padding: "4px" },
            }}
            sx={{ flexGrow: 0, marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus style={{ color: 'white', marginRight: '8px' }} />}
            onClick={handleAddKonselor}
            style={{ color: 'white' }} 
          >
            Tambah Konselor
          </Button>
        </Box>
        <KonselorTable
          konselor={filteredKonselor}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          handleEdit={handleEdit}
          handleDelete={handleOpenConfirmDialog}
        />
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
            Apakah Anda yakin ingin menghapus nama konselor?
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
              backgroundColor: "#F48C06",
              '&:hover': { backgroundColor: "#f7a944" }
            }}
            variant="contained"
            onClick={() => handleDelete(deleteKonselor)}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default KonselorList;
