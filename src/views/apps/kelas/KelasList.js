import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import { IconSchool } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BreadcrumbKelas from "src/components/apps/kelas/kelasList/BreadcrumbKelasList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KelasTable from "src/components/apps/kelas/kelasList/KelasTable";

const KelasList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [kelas, setKelas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteKelasId, setDeleteKelasId] = useState(null);
  const [waliKelasOptions, setWaliKelasOptions] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const [responseKelas, responseWaliKelas] = await Promise.all([
          axiosInstance.get('/kelas'),
          axiosInstance.get('/wali-kelas')
        ]);
        setKelas(responseKelas.data);
        setWaliKelasOptions(responseWaliKelas.data);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
        console.error("Terjadi kesalahan:", errorMessage);
        setError(errorMessage);
      } finally {
        const timer = setTimeout(() => {
          setError("");
          setSuccess("");
          }, 3000);
          return () => clearTimeout(timer);
      }
    };
    fetchKelas();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredKelas = kelas
    .filter((kelas) =>
      kelas.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/kelas/edit/${id}`);
  };

  const handleAddKelas = () => {
    navigate("/dashboard/admin/kelas/tambah-kelas");
  };

  const handleDelete = async (id) => {
    try {
     const response = await axiosInstance.delete(`/kelas/${id}`);
      setKelas(kelas.filter(kelas => kelas.id !== id));
      setConfirmDialogOpen(false);
      setSuccess(response.data.msg)
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menghapus data";
      console.error("Terjadi kesalahan:", errorMessage);
      setError(errorMessage);
      } finally {
      const timer = setTimeout(() => {
          setError("");
          setSuccess("");
          }, 3000);
          return () => clearTimeout(timer);
        }
  };

  const handleDetail = (id) => {
    navigate(`/dashboard/admin/kelas/detail/${id}`);
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteKelasId(id);
    setConfirmDialogOpen(true);
  };
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Data Kelas" description="Data Kelas">
      <BreadcrumbKelas />
      <Alerts error={error} success={success}/>
      <ParentCard title="Data Kelas">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
        }}
        
        >
          <SearchButton
          value={searchQuery}
          onChange={handleSearchChange}
          />
          <AddButton
          icon={<IconSchool style={{ color: 'white', marginRight: '8px' }} />}
          onClick={handleAddKelas}
          >
            Tambah Kelas
          </AddButton>
        </Box>
        <KelasTable
          kelas={filteredKelas}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          handleEdit={handleEdit}
          handleDetail={handleDetail}
          handleDelete={handleOpenConfirmDialog}
          waliKelasOptions={waliKelasOptions}
        />
      </ParentCard>
      {/* Dialog Konfirmasi Hapus */}
      <Dialog
      open={confirmDialogOpen}
      onClose={handleCloseConfirmDialog}
      maxWidth="sm"
      fullWidth
      aria-labelledby="dialog-title" // Menambahkan aria-labelledby untuk memberikan informasi kepada screen reader
      aria-describedby="dialog-description" // Menambahkan aria-describedby untuk memberikan penjelasan lebih lanjut
    >
      <DialogContent>
        <Typography id="dialog-title" variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
          Apakah Anda yakin ingin menghapus nama kelas? Menghapus nama kelas akan menghapus data siswa yang ada di kelas tersebut.
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
          onClick={() => handleDelete(deleteKelasId)}
        >
          Hapus
    </Button>
  </DialogActions>
</Dialog>

    </PageContainer>
  );
};

export default KelasList;
