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
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconAward, IconBuilding, IconCategory, IconTrophy, IconClipboardList  } from "@tabler/icons";

const TambahPrestasiMadrasahForm = ({ setSuccess, setError }) => {
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);
    const [formState, setFormState] = useState({
        lomba: "",
        tingkatId: "",
        juaraId: "",
        penyelenggara: "",
        keterangan: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [tingkatanResponse, juaraResponse] = await Promise.all([
                    axiosInstance.get('/options/tingkatan'),
                    axiosInstance.get('/options/juara')
                ]);
    
                const sortedTingkatan = tingkatanResponse.data.sort((a, b) => a.nama_tingkatan.localeCompare(b.nama_tingkatan));
                const sortedJuara = juaraResponse.data.sort((a, b) => a.nama_juara.localeCompare(b.nama_juara));
    
                setTingkatanOptions(sortedTingkatan);
                setJuaraOptions(sortedJuara);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };
    
        fetchOptions();
    }, []);
    

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
        setIsLoading(true)
        try {
            await axiosInstance.post('/prestasi-madrasah/tambah-prestasi', {
                lomba: formState.lomba,
                tingkat_id: formState.tingkatId,
                juara_id: formState.juaraId,
                penyelenggara: formState.penyelenggara,
                keterangan: formState.keterangan
            });
            setSuccess("Prestasi madrasah berhasil ditambahkan");
            setError("");
            setFormState({
                lomba: "",
                tingkatId: "",
                juaraId: "",
                penyelenggara: "",
                keterangan:""
            });
            setTimeout(() => navigate('/dashboard/admin/prestasi/madrasah'), 3000);
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
                        <CustomFormLabel htmlFor="lomba" sx={{ mt: 0, mb: 1 }}>
                            Lomba
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconTrophy/></InputAdornment>}
                        id="lomba"
                        name="lomba"
                        value={formState.lomba}
                        onChange={handleChange}
                        fullWidth
                        required
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
                    <SubmitButton isLoading={isLoading}/>
                    <CancelButton onClick={handleCancel}>Batal</CancelButton>
                </Grid>
                </Grid>
            </form>
    );
};

TambahPrestasiMadrasahForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default TambahPrestasiMadrasahForm;
