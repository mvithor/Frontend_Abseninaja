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
import { IconStars } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcKategoriPoinList from "src/components/apps/kategoriPoin/List/BcKategoriPoinList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KategoriPoinTable from "src/components/apps/kategoriPoin/List/KategoriPoinTable";

const KategoriPoinList = () => {
    const [poin, setPoin] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteKategoriPoin, setDeleteKategoriPoin] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPoin = async () => {
            try {
                const response = await axiosInstance.get('/kategori-poin');
                setPoin(response.data);
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
        fetchPoin();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPoin = poin
    .filter((poin) => 
        poin.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_kategori.localeCompare(b.nama_kategori));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAdd = () => {
        navigate(`/dashboard/admin/kategori-poin/tambah-kategori-poin`);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/kategori-poin/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!deleteKategoriPoin) {
            console.error("ID untuk dihapus tidak valid");
            setError("Kategori poin tidak ditemukan");
            return;
        }
        try {
            const response = await axiosInstance.delete(`/kategori-poin/${deleteKategoriPoin}`);
            setPoin(poin.filter((item) => item.id !== deleteKategoriPoin));
            setConfirmDialogOpen(false);
            setSuccess(response.data.msg);
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

    const handleOpenConfirmDialog = (id) => {
        setDeleteKategoriPoin(id);
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
        <PageContainer title="Kategori Poin" description="Kategori Poin">
            <BcKategoriPoinList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Kategori Poin">
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
                icon={<IconStars style={{ color: 'white', marginRight: '8px' }} />}
                onClick={handleAdd}
                >
                    Tambah Kategori
                </AddButton>
                </Box>
                <KategoriPoinTable
                poin={filteredPoin}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleRowsPerPageChange}
                handleEdit={handleEdit}
                handleDelete={handleOpenConfirmDialog}
                />
            </ParentCard>
            <Dialog
                open={confirmDialogOpen}
                onClose={handleCloseConfirmDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
                        Apakah Anda yakin ingin menghapus kategori poin ?
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
                        onClick={handleDelete}
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default KategoriPoinList;