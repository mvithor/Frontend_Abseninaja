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
import { IconClipboardText } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcBidangBimbinganList from "src/components/apps/bimbingan/List/BcBidangBimbinganList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BidangBimbinganTable from "src/components/apps/bimbingan/List/BidangBimbinganTable";

const BidangBimbinganList = () => {
    const [bidang, setBidang] = useState ([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteBidangId, setDeleteBidangId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBidang = async () => {
            try {
                const response = await axiosInstance.get('/bidang-bimbingan');
                setBidang(response.data);
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
        fetchBidang();
    }, []);
    

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBidang = bidang
    .filter((bidang) => 
        bidang.bidang_bimbingan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.bidang_bimbingan.localeCompare(b.bidang_bimbingan));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/bidang-bimbingan/edit/${id}`);
    };

    const handleAddBidang = () => {
        navigate(`/dashboard/admin/bidang-bimbingan/tambah-bidang-bimbingan`);
    };

    const handleDelete = async () => {
        if (!deleteBidangId) {
            console.error("ID untuk dihapus tidak valid.");
            setError("ID untuk dihapus tidak valid.");
            return;
        }

        try {
            const response = await axiosInstance.delete(`/bidang-bimbingan/${deleteBidangId}`);
            setBidang(bidang.filter((item) => item.id !== deleteBidangId));
            setConfirmDialogOpen(false);
            setSuccess(response.data.msg);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat menghapus data";
            console.error(errorMsg);
            setError(errorMsg);
        } finally {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    };
    const handleOpenConfirmDialog = (id) => {
        setDeleteBidangId(id);
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
        <PageContainer title="Bidang Bimbingan" description="Bidang Bimbingan">
            <BcBidangBimbinganList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Bidang Bimbingan">
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
                icon={<IconClipboardText style={{ color: 'white', marginRight: '8px' }} />}
                onClick={handleAddBidang}
                >
                    Tambah Bidang
                </AddButton>
                </Box>
                <BidangBimbinganTable
                bidang={filteredBidang}
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
                        Apakah Anda yakin ingin menghapus bidang bimbingan ?
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

export default BidangBimbinganList;