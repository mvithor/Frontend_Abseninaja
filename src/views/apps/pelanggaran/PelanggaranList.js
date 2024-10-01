import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Alert
} from "@mui/material";
import { IconPlus } from "@tabler/icons";
import BreadcrumbPelanggaran from "src/components/apps/pelanggaran/pelanggaranList/BreadcrumbPelanggaranList";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import PelanggaranTable from "src/components/apps/pelanggaran/pelanggaranList/PelanggaranTable";

const PelanggaranList = () => {
  const [page, SetPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pelanggaran, SetPelanggaran] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [deletePelanggaranId, setDeletepelanggaranId] = useState(null); 
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelanggaran = async () => {
      try {
        const response = await axiosInstance.get("/admin/api/pelanggaran");
        SetPelanggaran(response.data.dataPelanggaran);
        console.log('data:', pelanggaran);
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
    fetchPelanggaran();
  }, [pelanggaran]); // Tambahkan pelanggaran ke dalam array dependencies

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPelanggaran = pelanggaran
    .filter((pelanggaran) =>
      pelanggaran.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_siswa.localeCompare(b.nama_siswa));

  const handleChangePage = (event, newPage) => {
    SetPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    SetPage(0);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/pelanggaran/edit/${id}`);
  };

  const handleAddPelanggaran = () => {
    navigate("/dashboard/admin/pelanggaran/add-pelanggaran");
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/api/pelanggaran/${id}`);
      SetPelanggaran(pelanggaran.filter(pelanggaran => pelanggaran.id !== id));
      setConfirmDialogOpen(false); 
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data pelanggaran:', error.message);
      setError('Terjadi kesalahan saat menghapus data pelanggaran');
    }
  };

  const handleOpenConfirmDialog = (id) => {
    setDeletepelanggaranId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const ColorAlerts = ({ message }) => {
    return (
      <Alert severity="error">
        {message}
      </Alert>
    );
  };

  return (
    <PageContainer title="Data pelanggaran" description="Data pelanggaran">
      <BreadcrumbPelanggaran/>
      <Box justifyContent={"center"} mb={5}>
        {error && <ColorAlerts message={error} />}
      </Box>
      <ParentCard title="Data pelanggaran">
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
            startIcon={<IconPlus />}
            onClick={handleAddPelanggaran}
          >
            Tambah Pelanggaran
          </Button>
        </Box>

        <PelanggaranTable
          pelanggaran={filteredPelanggaran}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
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
            Apakah Anda yakin ingin menghapus data pelanggaran?. Menghapus data pelanggaran akan menghapus data siswa yang ada dipelanggaran tersebut
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button 
            sx={{mr:3}} 
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
            onClick={() => handleDelete(deletePelanggaranId)}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

    </PageContainer>
  );
};

export default PelanggaranList;
