import React, { useState } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconUser, IconMail, IconBrandTelegram, IconPhone, IconLock, IconBriefcase } from "@tabler/icons";

const TambahWaliKelasForm = ({ setSuccess, setError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        alamat: "",
        nomorTelepon: "",
        jabatan: ""
    });
    const navigate = useNavigate();

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
            const response = await axiosInstance.post('/wali-kelas/tambah-wali-kelas', {
                name: formState.name,
                email: formState.email,
                password: formState.password,
                alamat: formState.alamat,
                nomor_telepon: formState.nomorTelepon,
                jabatan: formState.jabatan
            });
            setSuccess(response.data.message);
            setError("");
            setFormState({
                name: "",
                email: "",
                password: "",
                alamat: "",
                nomorTelepon: "",
                jabatan: ""
            });
            setTimeout(() => navigate('/dashboard/admin/wali-kelas'), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.message);
            } else {
                console.error("Terjadi kesalahan:", error.message);
                setError("Terjadi kesalahan saat menambahkan wali kelas");
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
                        <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: 1 }}>
                            Nama Wali Kelas
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Suyanto"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="email" sx={{ mt: 0, mb: 1 }}>
                            Email
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconMail /></InputAdornment>}
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="suyanto@gmail.com"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="password" sx={{ mt: 0, mb: 1 }}>
                            Password
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        type={showPassword ? "text" : "password"} // Ubah jenis input berdasarkan `showPassword`
                        startAdornment={<InputAdornment position="start"><IconLock /></InputAdornment>}
                        endAdornment={ // Pastikan endAdornment berada dalam CustomOutlinedInput
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder="Password"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="alamat" sx={{ mt: 0, mb: 1 }}>
                            Alamat
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconBrandTelegram /></InputAdornment>}
                        id="alamat"
                        name="alamat"
                        value={formState.alamat}
                        onChange={handleChange}
                        placeholder="Gunung Rejo, Way Lima, Pesawaran"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nomorTelepon" sx={{ mt: 0, mb: 1 }}>
                            Telepon
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconPhone /></InputAdornment>}
                        id="nomorTelepon"
                        name="nomorTelepon"
                        value={formState.nomorTelepon}
                        onChange={handleChange}
                        placeholder="089745672134"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="jabatan" sx={{ mt: 0, mb: 1 }}>
                            Jabatan
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconBriefcase /></InputAdornment>}
                        id="jabatan"
                        name="jabatan"
                        value={formState.jabatan}
                        onChange={handleChange}
                        placeholder="Wali Kelas"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={isLoading} />
                        <CancelButton onClick={handleCancel} />
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

TambahWaliKelasForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
};

export default TambahWaliKelasForm;
