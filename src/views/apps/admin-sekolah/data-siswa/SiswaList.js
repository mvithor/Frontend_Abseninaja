import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { validate as isUUID } from "uuid";
import Alerts from "src/components/alerts/Alerts";
import AddButton from "src/components/buttonGroup/AddButton";
import SearchButton from "src/components/buttonGroup/SearchButton";
import FilterButton from "src/components/buttonGroup/FilterButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import SiswaTable from "src/apps/admin-sekolah/data-siswa/List/SiswaTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";

const fetchSiswa = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/siswa');
        return response.data.data;
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Error fetching siswa:', error);
        }
        throw new Error('Terjadi kesalahan saat mengambil data siswa. Silakan coba lagi'); 
    }
};

const SiswaList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteSiswa, setDeleteSiswa] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: siswa = [], isLoading, isError, error: queryError } = useQuery({
        queryKey: ['siswa'],
        queryFn: fetchSiswa,
        onError: (error) => {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
            setError(errorMessage);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(`/api/v1/siswa/${id}`);
            return response.data; 
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['siswa']); 
            setSuccess(data.msg || "Data siswa berhasil dihapus"); 
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || []; 
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menghapus data siswa';
            if (errorDetails.length > 0) {
                setError(errorDetails.join(', '));
            } else {
                setError(errorMsg);
            }
            setSuccess('');
            setTimeout(() => setError(''), 3000); 
        }
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    const filteredSiswa = siswa
        .filter((siswa) => 
          siswa.User.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.User.name.localeCompare(b.User.name));
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAdd = () => {
        navigate('/dashboard/admin-sekolah/siswa/tambah')
    }

    const handleEdit = (id) => {
        if (!id || !isUUID(id)) {
            return;
        }
        navigate(`/dashboard/admin-sekolah/siswa/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!deleteSiswa) {
            setError("Data siswa tidak ditemukan");
            return;
        }
        deleteMutation.mutate(deleteSiswa);
        setConfirmDialogOpen(false);
        setDeleteSiswa(null);
    };

    const handleOpenConfirmDialog = (id) => {
        setDeleteSiswa(id);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
        setDeleteSiswa(null);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <PageContainer title="Data Siswa" description="Data Siswa">
            <ParentCard title="Data Siswa">
                <Alerts error={error} success={success}/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2, 
                        width: '100%',
                        mb: 3,
                        mt: -2
                    }}
                    >
                <SearchButton
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Cari Nama Siswa"
                />
                <AddButton
                    icon={<IconPlus size={20} color="white" />}
                    onClick={handleAdd}
                    >
                    Tambah Siswa
                </AddButton>
                <FilterButton/>
                </Box>
                <SiswaTable
                    siswa={filteredSiswa}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    handleEdit={handleEdit}
                    handleDelete={handleOpenConfirmDialog}
                    isLoading={isLoading}
                    isError={isError}
                    errorMessage={queryError?.message || "Terjadi kesalahan saat memuat data"}
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
                    Apakah Anda yakin ingin menghapus data siswa ?
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
                    disabled={deleteMutation.isLoading}
                >
                    {deleteMutation.isLoading ? <CircularProgress size={24} /> : 'Hapus'}
                </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default SiswaList;