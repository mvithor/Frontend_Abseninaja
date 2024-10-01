import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  MenuItem
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconCategory, IconClipboardText, IconMilitaryAward } from "@tabler/icons";


const TambahPoinSiswaForm = ({ setSuccess, setError}) => {
    const [students, setStudents] = useState([]);
    const [kategoriPoinOptions, setKategoriPoinOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        studentIds: [],
        kategoriPoinId: "",
        points: "",
        description: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKategoriPoinOptions = async () => {
            try {
                const [studentResponse, kategoriPoinResponse] = await Promise.all([
                    axiosInstance.get('/poin/options'),
                    axiosInstance.get('/kategori-poin/options')
                ]);
                const sortedStudents = studentResponse.data.sort((a, b) => a.name.localeCompare(b.name));
                const sortedKategoriPoin = kategoriPoinResponse.data.sort((a, b) => a.nama_kategori.localeCompare(b.nama_kategori));

                setStudents(sortedStudents);
                setKategoriPoinOptions(sortedKategoriPoin);
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
        fetchKategoriPoinOptions();
    }, [setError]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/poin/tambah-poin', {
                student_ids: formState.studentIds,
                kategori_poin_id: formState.kategoriPoinId,
                points: formState.points,
                description: formState.description,
            });

            setSuccess(response.data.msg);
            setError("");
            setFormState({
                studentIds: [],
                kategoriPoinId: "",
                points: "",
                description: "",
            });
            setTimeout(() => navigate('/dashboard/admin/poin'), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error("Terjadi kesalahan:", error.message);
                setError("Terjadi kesalahan saat menambah poin siswa");
            }
            setSuccess("");
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="studentId" sx={{ mt: 0, mb: 1 }}>
                        Nama Siswa
                    </CustomFormLabel>
                </Box>
                <Autocomplete
                    multiple
                    id="studentIds"
                    options={students}
                    getOptionLabel={(option) => option.name}
                    value={students.filter((student) => formState.studentIds.includes(student.id)) || []}
                    onChange={(event, newValue) => {
                        setFormState({ ...formState, studentIds: newValue.map(student => student.id) });
                    }}
                    renderInput={(params) => (
                        <CustomTextField {...params} placeholder="Cari / Pilih nama siswa" aria-label="Pilih nama siswa" />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="kategoriPoinId" sx={{ mt: 0, mb: 1 }}>
                        Kategori Poin
                    </CustomFormLabel>
                </Box>
                <CustomSelect
                    id="kategoriPoinId"
                    name="kategoriPoinId"
                    value={formState.kategoriPoinId}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    startAdornment={<InputAdornment position="start"><IconCategory/></InputAdornment>}
                    required
                >
                    {kategoriPoinOptions.map((kategoriPoin) => (
                            <MenuItem key={kategoriPoin.id} value={kategoriPoin.id}>
                                {kategoriPoin.nama_kategori}
                            </MenuItem>
                        ))}
                </CustomSelect>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="points" sx={{ mt: 0, mb: 1 }}>
                        Poin
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                    id= "points"
                    name="points"
                    value={formState.points}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start"><IconMilitaryAward /></InputAdornment>}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="description" sx={{ mt: 0, mb: 1 }}>
                        Deskripsi
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                    id= "description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start"><IconClipboardText /></InputAdornment>}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                    <SubmitButton isLoading={isLoading}/>
                    <CancelButton onClick={handleCancel}>Batal</CancelButton>
                </Box>
            </Grid>
        </Grid>
        </form>
    );
};

TambahPoinSiswaForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default TambahPoinSiswaForm;