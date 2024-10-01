import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Typography,
    DialogActions
} from "@mui/material";
import BcWaliKelasList from 'src/components/apps/waliKelas/List/BcWaliKelasList';
import Alerts from 'src/components/alerts/Alerts';
import { IconUserPlus } from '@tabler/icons';
import AddButton from 'src/components/apps/buttonGroup/AddButton';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import WaliKelasTable from 'src/components/apps/waliKelas/List/WaliKelasTable';

const WaliKelasList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [waliKelas, setWaliKelas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteWaliKelas, setDeleteWaliKelas] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWaliKelas = async () => {
            try {
                const response = await axiosInstance.get('/wali-kelas');
                setWaliKelas(response.data);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    console.error("Error fetching data:", error.response.data);
                    setError(error.response.data.msg);
                } else {
                    console.error("Terjadi kesalahan:", error.message);
                    setError("Terjadi kesalahan saat memuat data");
                }
                    setTimeout(() => {
                        setError("");
                    }, 3000); 
            }
        };
        fetchWaliKelas();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredWaliKelas = waliKelas
    .filter((waliKelas) =>
      waliKelas.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
    
    const handleEdit = (id) => {
        navigate(`/dashboard/admin/wali-kelas/edit/${id}`);
    };
    
    const handleAdd = () => {
        navigate("/dashboard/admin/wali-kelas/tambah-wali-kelas");
    };

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/wali-kelas/${id}`);
            setWaliKelas(waliKelas.filter(waliKelas => waliKelas.id !== id));
            setConfirmDialogOpen(false);
            setSuccess(response.data.msg);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error("Terjadi kesalahan:", error.message);
                setError("Terjadi kesalahan saat menghapus data");
            }
            } finally {
                setTimeout(() => {
                    setError("");
                    setSuccess("");
                }, 3000); 
        }
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteWaliKelas(id);
        setConfirmDialogOpen(true);
      };
      const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
      };

      return (
        <PageContainer title="Data Wali Kelas" description="Data Wali Kelas">
            <BcWaliKelasList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Wali Kelas">
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
           icon={<IconUserPlus style={{ color: 'white', marginRight: '8px' }} />}
           onClick={handleAdd}
          
          >
            Tambah Wali
          </AddButton>
        </Box>
            <WaliKelasTable
            waliKelas={filteredWaliKelas}
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
            Apakah Anda yakin ingin menghapus wali kelas ?
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
            onClick={() => handleDelete(deleteWaliKelas)}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
        </PageContainer>
      );
};

export default WaliKelasList;