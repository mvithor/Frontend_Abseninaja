import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import Alerts from "src/components/alerts/Alerts";
import BcLogPoinSiswaList from "src/components/apps/logPoinSiswa/List/BcLogPoinSiswaList";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import LogPoinSiswaTable from "src/components/apps/logPoinSiswa/List/LogPoinSiswaTable";

const LogPoinSiswaList = () => {
    const [poin, setPoin] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deletePoin, setDeletePoin] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [studentOptions, setStudentOptions] = useState([]);
    const [kategoriPoinOptions, setKategoriPoinOptions] = useState([]);
    

    // Fetching data and sorting by ID in descending order to show new entries on top
    
    useEffect(() => {
        const fetchPoin = async () => {
            try {
                const [responsePoin, responseStudent, responseKategori] = await Promise.all([
                    axiosInstance.get('/poin'),
                    axiosInstance.get('/poin/options'),
                    axiosInstance.get('/kategori-poin/options')
                ]);

                // Sorting data by 'id' in descending order (assuming 'id' is the field used to identify entries)
                const sortedPoin = responsePoin.data.sort((a, b) => b.id - a.id);

                setPoin(sortedPoin);
                setStudentOptions(responseStudent.data);
                setKategoriPoinOptions(responseKategori.data);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset page to 0 when rows per page changes
    };
    

    const getStudentName = (studentId) => {
        const student = studentOptions.find(option => option.id === studentId);
        return student ? student.name : '';
    };

    // Filtering poin based on search query and sorting by student name
    const filteredPoin = poin.filter((poin) =>
        getStudentName(poin.student_id).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async () => {
        if (!deletePoin) {
            console.error("ID untuk dihapus tidak valid");
            setError("Kategori poin tidak ditemukan");
            return;
        };
        try {
            const response = await axiosInstance.delete(`/poin/${deletePoin}`);
            setPoin(poin.filter((item) => item.id !== deletePoin));  // Remove the deleted item
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
        setDeletePoin(id);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <PageContainer title="Log Poin Siswa" description="Log Poin Siswa">
            <BcLogPoinSiswaList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Log Poin Siswa">
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
                </Box>
                <LogPoinSiswaTable
                    poin={filteredPoin}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    handleDelete={handleOpenConfirmDialog}
                    studentOptions={studentOptions}
                    kategoriPoinOptions={kategoriPoinOptions}
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
                        Apakah Anda yakin ingin menghapus log poin siswa?
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

export default LogPoinSiswaList;
