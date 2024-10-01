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
import { IconTrophy } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcNamaReguList from "src/components/apps/prestasiRegu/List/BcNamaReguList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import NamaReguTable from "src/components/apps/prestasiRegu/List/NamaReguTable";

const NamaReguList = () => {
    const [regu, setRegu] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [deleteReguId, setDeleteReguId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchRegu = async () => {
            try {
                const response = await axiosInstance.get('/prestasi-regu');
                setRegu(response.data);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    console.error("Terjadi kesalahan:", error.response.data);
                    setError(error.response.data.msg);
                } else {
                    console.error("Terjadi kesalahan:", error.message);
                    setError("Terjadi kesalahan saat memuat data");
                }
                setSuccess("");
            } finally {
                setTimeout(() => {
                    setError("");
                    setSuccess("");
                }, 3000);
            }
        };
        fetchRegu();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRegu = regu
    .filter((regu) => 
        regu.nama_regu.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_regu.localeCompare(b.nama_regu));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/prestasi/regu/edit/${id}`);
    };

    const handleAddRegu = () => {
        navigate('/dashboard/admin/prestasi/regu/tambah-nama-regu');
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/prestasi-regu/${deleteReguId}`);
            setRegu(regu.filter((item) => item.id !== deleteReguId));
            setConfirmDialogOpen(false);
            setSuccess(response.data.msg)
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
            }, 2000); 
        }
    };

    const handleDetail = (id) => {
        navigate(`/dashboard/admin/prestasi/regu/detail/${id}`);
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteReguId(id);
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
        <PageContainer title="Data Prestasi Tim" description="Data Tim">
            <BcNamaReguList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Nama Tim">
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
                onClick={handleAddRegu}
                >
                    Tambah Tim
                </AddButton>
        </Box>
        <NamaReguTable
            regu={filteredRegu}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleRowsPerPageChange}
            handleEdit={handleEdit}
            handleDetail={handleDetail}
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
                        Apakah Anda yakin ingin menghapus nama tim. Menghapus nama tim akan menghapus nama siswa yang terdaftar di dalam prestasi tim?
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
    )
}

export default NamaReguList;
