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
import { IconUserPlus } from "@tabler/icons";
import BcUsersList from 'src/components/apps/users/List/BcUsersList';
import Alerts from 'src/components/alerts/Alerts';
import AddButton from 'src/components/apps/buttonGroup/AddButton';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import UsersTable from 'src/components/apps/users/List/UsersTable';

const UsersList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteUsers, setDeleteUsers] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/all');
                setUsers(response.data);
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
        fetchUsers();
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

    const filteredUsers = users
        .filter((users) =>
            users.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const handleAdd = () => {
        navigate('/dashboard/admin/users/tambah-users');
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/users/edit/${id}`)
    };

    const handleDelete = async () => {
        if(!deleteUsers) {
            console.error("User tidak ditemukan");
            setError("User tidak ditemukan")
        }
        try {
            const response = await axiosInstance.delete(`/users/${deleteUsers}`);
            setUsers(users.filter((item) => item.id !== deleteUsers));
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
        setDeleteUsers(id);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <PageContainer title="Manajemen Pengguna" description="Manajemen Pengguna">
            <BcUsersList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Manajemen Pengguna">
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
                    Tambah Pengguna
                </AddButton>
                </Box>
                <UsersTable
                users={filteredUsers}
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
                        Apakah Anda yakin ingin menghapus akun pengguna ? Penghapusan akun ini akan menghapus seluruh data yang terkait dengan pengguna ini secara permanen dan tidak dapat dipulihkan
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

export default UsersList;