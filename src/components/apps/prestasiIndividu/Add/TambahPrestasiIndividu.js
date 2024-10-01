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
import { IconAward, IconBuilding, IconCategory, IconClipboardList  } from "@tabler/icons";

const TambahPrestasiIndividuForm = ({ setSuccess, setError }) => {
    const [students, setStudents] = useState([]);
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        studentIds: [], // Change `studentId` to `studentIds` to support multiple selections
        tingkatId: "",
        juaraId: "",
        penyelenggara: "",
        keterangan: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [studentResponse, tingkatanResponse, juaraResponse] = await Promise.all([
                    axiosInstance.get('/prestasi-individu/nama-siswa'),
                    axiosInstance.get('/options/tingkatan'),
                    axiosInstance.get('/options/juara')
                ]);
                const sortedStudents = studentResponse.data.sort((a, b) => a.name.localeCompare(b.name));
                const sortedTingkatan = tingkatanResponse.data.sort((a, b) => a.nama_tingkatan.localeCompare(b.nama_tingkatan));
                const sortedJuara = juaraResponse.data.sort((a, b) => a.nama_juara.localeCompare(b.nama_juara));
                
                setStudents(sortedStudents);
                setTingkatanOptions(sortedTingkatan);
                setJuaraOptions(sortedJuara);
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
    
        fetchOptions();
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
            await axiosInstance.post('/prestasi-individu/tambah-prestasi', {
                student_ids: formState.studentIds,
                tingkat_id: formState.tingkatId,
                juara_id: formState.juaraId,
                penyelenggara: formState.penyelenggara,
                keterangan: formState.keterangan
            });
    
            setSuccess("Prestasi individu berhasil ditambahkan");
            setError("");
            setFormState({
                studentIds: [],
                tingkatId: "",
                juaraId: "",
                penyelenggara: "",
                keterangan: ""
            });
            setTimeout(() => navigate('/dashboard/admin/prestasi/individu'), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error("Terjadi kesalahan:", error.message);
                setError("Terjadi kesalahan saat menambah prestasi");
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
                        <CustomFormLabel htmlFor="nama" sx={{ mt: 0, mb: 1 }}>
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
                        <CustomFormLabel htmlFor="tingkatId" sx={{ mt: 0, mb: 1 }}>
                            Tingkat
                        </CustomFormLabel>
                    </Box>
                    <CustomSelect
                        id="tingkatId"
                        name="tingkatId"
                        value={formState.tingkatId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconCategory/></InputAdornment>}
                        required
                    >
                        {tingkatanOptions.map((tingkatan) => (
                            <MenuItem key={tingkatan.id} value={tingkatan.id}>
                                {tingkatan.nama_tingkatan}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="juaraId" sx={{ mt: 0, mb: 1 }}>
                            Juara
                        </CustomFormLabel>
                    </Box>
                    <CustomSelect
                        id="juaraId"
                        name="juaraId"
                        value={formState.juaraId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconAward/></InputAdornment>}
                        required
                    >
                        {juaraOptions.map((juara) => (
                            <MenuItem key={juara.id} value={juara.id}>
                                {juara.nama_juara}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="penyelenggara" sx={{ mt: 0, mb: 1 }}>
                            Penyelenggara
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="penyelenggara"
                        name="penyelenggara"
                        value={formState.penyelenggara}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><IconBuilding /></InputAdornment>}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="keterangan" sx={{ mt: 0, mb: 1 }}>
                            Keterangan
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="keterangan"
                        name="keterangan"
                        value={formState.keterangan}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><IconClipboardList/></InputAdornment>}
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

TambahPrestasiIndividuForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
}

export default TambahPrestasiIndividuForm;
