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
import { IconHomeHeart } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKeluargaList from "src/components/apps/statusKeluarga/List/BcStatusKeluargaList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import StatusKeluargaTable from "src/components/apps/statusKeluarga/List/StatusKeluargaTable";

const StatusKeluargaList = () => {
    const [status, setStatus] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axiosInstance.get('/status-keluarga');
                setStatus(response.data);
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
        fetchStatus();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredStatus = status
    .filter((status) => 
        status.nama_status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.nama_status.localeCompare(b.nama_status));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAdd = () => {
        navigate(`/dashboard/admin/status-keluarga/tambah-status-keluarga`);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/status-keluarga/edit/${id}`)
    };

    const handleDelete = async () => {
        if (!deleteStatus) {
            console.error("ID untuk dihapus tidak valid");
            setError("Status keluarga tidak ditemukan");
            return;
        } try {
            const response = await axiosInstance.delete(`/status-keluarga/${deleteStatus}`);
            setStatus(status.filter((item) => item.id !== deleteStatus));
            setConfirmDialogOpen(false);
            setSuccess(response.data.msg);
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menghapus data";
            console.error("Terjadi kesalahan:", errorMessage);
            setError(errorMessage);
        } finally {
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
           
        }
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteStatus(id);
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
        <PageContainer title="Status Keluarga" description="Status Keluarga">
            <BcStatusKeluargaList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Status Keluarga">
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
                icon={<IconHomeHeart style={{ color: 'white', marginRight: '8px' }} />}
                onClick={handleAdd}
                >
                    Tambah Status
                </AddButton>
                </Box>
                <StatusKeluargaTable
                status={filteredStatus}
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
                        Apakah Anda yakin ingin menghapus status keluarga ?
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

export default StatusKeluargaList;