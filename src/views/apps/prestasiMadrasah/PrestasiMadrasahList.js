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
import { IconTrophy } from "@tabler/icons";
import BcPrestasiMadrasahlist from 'src/components/apps/prestasiMadrasah/prestasiMadrasahList/BcPrestasiMadrasah';
import Alerts from 'src/components/alerts/Alerts';
import AddButton from 'src/components/apps/buttonGroup/AddButton';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import PrestasiMadrasahTable from 'src/components/apps/prestasiMadrasah/prestasiMadrasahList/PrestasiMadrasahTable';

const PrestasiMadrasahList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [prestasiMadrasah, setPrestasiMadrasah] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deletePrestasiMadrasah, setDeletePrestasiMadrasah] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrestasiMadrasah = async () => {
            try {
                const [responsePrestasi, responseTingkatan, responseJuara] = await Promise.all([
                    axiosInstance.get('/prestasi-madrasah'),
                    axiosInstance.get('/options/tingkatan'), // Adjust with your endpoint
                    axiosInstance.get('/options/juara') // Adjust with your endpoint
                ]);
                setPrestasiMadrasah(responsePrestasi.data);
                setTingkatanOptions(responseTingkatan.data);
                setJuaraOptions(responseJuara.data);
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
        fetchPrestasiMadrasah();
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

    const filteredPrestasiMadrasah = prestasiMadrasah
        .filter((prestasiMadrasah) =>
            prestasiMadrasah.lomba.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.lomba.localeCompare(b.lomba));

    const handleAddPrestasiMadrasah = () => {
        navigate(`/dashboard/admin/prestasi/madrasah/tambah-prestasi-madrasah`);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/prestasi/madrasah/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/prestasi-madrasah/${deletePrestasiMadrasah}`);
            setPrestasiMadrasah(prestasiMadrasah.filter((item) => item.id !== deletePrestasiMadrasah));
            setConfirmDialogOpen(false);
            setSuccess("Prestasi madrasah berhasil di hapus")
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
        setDeletePrestasiMadrasah(id);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <PageContainer title="Prestasi Madrasah" description="Data Prestasi Madrasah">
            <BcPrestasiMadrasahlist />
            <Alerts error={error} success={success}/>
            <ParentCard title="Prestasi Madrasah">
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
                icon={<IconTrophy style={{ color: 'white', marginRight: '8px' }} />}
                onClick={handleAddPrestasiMadrasah}
                >
                Tambah Prestasi
                </AddButton>
                </Box>
                <PrestasiMadrasahTable
                    prestasi={filteredPrestasiMadrasah}
                    tingkatanOptions={tingkatanOptions}
                    juaraOptions={juaraOptions}
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
                        Apakah Anda yakin ingin menghapus prestasi madrasah ?
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

export default PrestasiMadrasahList;
