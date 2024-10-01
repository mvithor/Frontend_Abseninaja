import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment } from '@mui/material';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IconUser, IconBrandTelegram, IconPhone, IconBriefcase } from "@tabler/icons";
import PropTypes from 'prop-types';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const WaliKelasEditForm = ({ waliKelas, setSuccess, setError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        namaWali: "",
        alamat: "",
        nomorTelepon: "",
        jabatan: ""
    });

    useEffect(() => {
        if (waliKelas) {
            setFormState({
                namaWali: waliKelas.nama_wali || '',  // Gunakan nama_wali dari API
                alamat: waliKelas.alamat || '',
                nomorTelepon: waliKelas.nomor_telepon || '',
                jabatan: waliKelas.jabatan || ''
            });
        }
    }, [waliKelas]);

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
        setSuccess("");
        setError("");

        try {
            const response = await axiosInstance.put(`/wali-kelas/${waliKelas.id}`, {
                user_id: waliKelas.user_id,  // user_id tidak diubah
                alamat: formState.alamat,
                nomor_telepon: formState.nomorTelepon,
                jabatan: formState.jabatan
            });
            setSuccess(response.data.msg);
            setTimeout(() => navigate('/dashboard/admin/wali-kelas'), 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat mengupdate data wali kelas";
            console.error("Terjadi kesalahan:", errorMsg);
            setError(errorMsg);
            setTimeout(() => setError(""), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="namaWali" sx={{ mt: 0, mb: 1 }}>
                            Nama Wali Kelas
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
                        id="namaWali"
                        name="namaWali"
                        variant="outlined"
                        value={formState.namaWali}
                        onChange={handleChange}
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
                        id="alamat"
                        name="alamat"
                        value={formState.alamat || ''}
                        onChange={handleChange}
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconBrandTelegram /></InputAdornment>}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nomorTelepon" sx={{ mt: 0, mb: 1 }}>
                            Nomor Telepon
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="nomorTelepon"
                        name="nomorTelepon"
                        value={formState.nomorTelepon || ''}
                        onChange={handleChange}
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconPhone /></InputAdornment>}
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
                        value={formState.jabatan || ''}
                        onChange={handleChange}
                        variant="outlined"
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

WaliKelasEditForm.propTypes = {
    waliKelas: PropTypes.object.isRequired,
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default WaliKelasEditForm;
