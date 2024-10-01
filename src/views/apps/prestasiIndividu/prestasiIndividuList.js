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
import BcPrestasiIndividuList from 'src/components/apps/prestasiIndividu/List/BcPrestasiIndividu';
import AddButton from 'src/components/apps/buttonGroup/AddButton';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import Alerts from 'src/components/alerts/Alerts';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import PrestasiIndividuTable from 'src/components/apps/prestasiIndividu/List/PrestasiIndividuTable';

const PrestasiIndividuList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [prestasiIndividu, setPrestasiIndividu] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deletePrestasiIndividu, setDeletePrestasiIndividu] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrestasiIndividu = async () => {
            try {
                const [responsePrestasi, responseTingkatan, responseJuara, responseStudent] = await Promise.all([
                    axiosInstance.get('/prestasi-individu'),
                    axiosInstance.get('/options/tingkatan'),
                    axiosInstance.get('/options/juara'),
                    axiosInstance.get('/prestasi-individu/nama-siswa')
                ]);
                setPrestasiIndividu(responsePrestasi.data);
                setTingkatanOptions(responseTingkatan.data);
                setJuaraOptions(responseJuara.data);
                setStudentOptions(responseStudent.data);
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

        fetchPrestasiIndividu();
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

    const getStudentName = (studentId) => {
        const student = studentOptions.find(option => option.id === studentId);
        return student ? student.name : '';
    };

    const filteredPrestasiIndividu = prestasiIndividu
    .filter((prestasi) =>
        getStudentName(prestasi.student_id).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => getStudentName(a.student_id).localeCompare(getStudentName(b.student_id)));




    const handleAddPrestasiIndividu = () => {
        navigate('/dashboard/admin/prestasi/individu/tambah-prestasi-individu')
    }

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/prestasi/individu/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/prestasi-individu/${deletePrestasiIndividu}`);
            setPrestasiIndividu(prestasiIndividu.filter((item) => item.id !== deletePrestasiIndividu));
            setConfirmDialogOpen(false);
            setSuccess("Prestasi individu berhasil di hapus");
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
        setDeletePrestasiIndividu(id);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <PageContainer title="Prestasi Individu" description="Data prestasi individu">
            <BcPrestasiIndividuList/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Prestasi Individu">
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
                    onClick={handleAddPrestasiIndividu}
                    >
                    Tambah Prestasi
                    </AddButton>
                </Box>
                <PrestasiIndividuTable
                    prestasiIndividu={filteredPrestasiIndividu}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    handleEdit={handleEdit}
                    handleDelete={handleOpenConfirmDialog}
                    tingkatanOptions={tingkatanOptions}
                    juaraOptions={juaraOptions}
                    studentOptions={studentOptions}
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
                        Apakah Anda yakin ingin menghapus prestasi individu ?
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

export default PrestasiIndividuList;
