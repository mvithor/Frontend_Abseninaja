import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Typography,
    DialogActions
} from "@mui/material";
import { IconTrophy } from "@tabler/icons";
import BcNamaReguDetail from 'src/components/apps/prestasiRegu/Detail/BcNamaReguDetail';
import Alerts from 'src/components/alerts/Alerts';
import AddButton from 'src/components/apps/buttonGroup/AddButton';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import NamaReguTableDetail from 'src/components/apps/prestasiRegu/Detail/NamaReguTableDetail';

const validateReguId = (id) => {
    return /^\d+$/.test(id);
};

const NamaReguDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [prestasiRegu, setPrestasiRegu] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteReguId, setDeleteReguId] = useState(null);
    const [deleteStudentId, setDeleteStudentId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [reguTitle, setReguTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!validateReguId(id)) {
            setError("Format ID Regu tidak valid");
            return;
        }

        const fetchPrestasiReguDetail = async () => {
            try {
                const [responsePrestasi, responseTingkatan, responseJuara, responseStudent] = await Promise.all([
                    axiosInstance.get(`/prestasi-regu-siswa/${id}`),
                    axiosInstance.get('/options/tingkatan'),
                    axiosInstance.get('/options/juara'),
                    axiosInstance.get('/prestasi-individu/nama-siswa')
                ]);
                if (Array.isArray(responsePrestasi.data) && responsePrestasi.data.length > 0) {
                    setPrestasiRegu(responsePrestasi.data);
                    // Set dynamic title based on the first item's nama_regu
                    setReguTitle(`Detail Prestasi ${responsePrestasi.data[0].nama_regu}`);
                } else {
                    setError("Tidak ada data prestasi Tim");
                }
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
                }, 2000); 
            }
        };
        fetchPrestasiReguDetail();
    }, [id]);

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

    const handleCancel = () => {
        navigate(-1);
    };

    const getStudentName = (studentId) => {
        const student = studentOptions.find(option => option.id === studentId);
        return student ? student.name : 'N/A';
    };

    const filteredPrestasiRegu = prestasiRegu
        .filter((prestasi) =>
            getStudentName(prestasi.student_id).toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => getStudentName(a.student_id).localeCompare(getStudentName(b.student_id)));

    const handleAdd = () => {
        navigate(`/dashboard/admin/prestasi/regu/detail/${id}/tambah-prestasi-siswa`);
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/prestasi/regu/detail/${id}/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/prestasi-regu-siswa/${deleteReguId}/${deleteStudentId}`);
            setPrestasiRegu(prestasiRegu.filter((item) => item.student_id !== deleteStudentId));
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
            }, 2000);    
        }
    };

    const handleOpenConfirmDialog = (reguId, studentId) => {
        setDeleteReguId(reguId);
        setDeleteStudentId(studentId);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    return (
        <PageContainer title="Prestasi Tim Detail" description='Prestasi Regu Detail'>
            <BcNamaReguDetail/>
            <Alerts error={error} success={success}/>
            <ParentCard title= {reguTitle}>
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
                   onClick={handleAdd}
                   >
                    Tambah Prestasi
                   </AddButton>
                </Box>
                <NamaReguTableDetail
                    prestasiRegu={filteredPrestasiRegu}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    handleEdit={handleEdit}
                    tingkatanOptions={tingkatanOptions}
                    juaraOptions={juaraOptions}
                    handleDelete={handleOpenConfirmDialog}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                    <Button
                        sx={{
                            backgroundColor: "#2F327D",
                            '&:hover': { backgroundColor: "#63659e" }
                        }}
                        variant="contained"
                        color="secondary"
                        type="button"
                        onClick={handleCancel}
                    >
                        Kembali
                    </Button>
                </Box>
            </ParentCard>
            <Dialog
                open={confirmDialogOpen}
                onClose={handleCloseConfirmDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
                        Apakah Anda yakin ingin menghapus prestasi siswa?
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

export default NamaReguDetail;
