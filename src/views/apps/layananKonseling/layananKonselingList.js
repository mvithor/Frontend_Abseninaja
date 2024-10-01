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
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import LayananKonselingTable from "src/components/apps/layananKonseling/layananKonselingList/layananKonselingTable";

const LayananKonselingList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [layananKonseling, setLayananKonseling] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null); 
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLayananKonseling = async () => {
      try {
        const response = await axiosInstance.get("/layanan-konseling");
        setLayananKonseling(response.data);
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
    fetchLayananKonseling();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLayananKonseling = layananKonseling
    .filter((layananKonseling) =>
        layananKonseling.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_siswa.localeCompare(b.nama_siswa));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/layanan-konseling/edit/${id}`);
  };

  const handleAddLayananKonseling = () => {
    navigate("/dashboard/admin/layanan-konseling/tambah");
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/layanan-konseling/${id}`);
      setLayananKonseling(layananKonseling.filter(layananKonseling => layananKonseling.id !== id));
      setConfirmDialogOpen(false); 
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data:', error.message);
      setError('Terjadi kesalahan saat menghapus data');
    }
  };

//   const handleDetail = (id) => {
//     navigate(`/dashboard/admin/layanan-konseling/${id}`);
//   };

  const handleOpenConfirmDialog = (id) => {
    setDeleteId(id);
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
    <PageContainer title="Data Layanan Konseling" description="Data Layanan Konseling">
      <Box justifyContent={"center"} mb={5}>
        {error && <ColorAlerts message={error} />}
      </Box>
      <ParentCard title="Data Layanan Konseling">
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
            onClick={handleAddLayananKonseling}
          >
            Tambah Data
          </Button>
        </Box>

        <LayananKonselingTable
          data={filteredLayananKonseling}
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
            Apakah Anda yakin ingin menghapus data ini?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button 
            sx={{ mr: 3 }}
            variant="outlined" 
            color="secondary" onClick={handleCloseConfirmDialog}>
            Batal
          </Button>
          <Button 
            sx={{
              mr: 3,
              backgroundColor: "#F48C06",
              '&:hover': { backgroundColor: "#f7a944" }
            }}
            variant="contained" 
            onClick={() => handleDelete(deleteId)}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default LayananKonselingList;
