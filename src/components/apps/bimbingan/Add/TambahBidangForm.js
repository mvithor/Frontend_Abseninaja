import React, { useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Grid, Box, InputAdornment } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconClipboardText } from '@tabler/icons'; 

const TambahBidangForm = ({ setSuccess, setError }) => {
    const [namaBidang, setNamaBidang] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setNamaBidang(event.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!namaBidang) {
            setError('Nama bidang bimbingan tidak boleh kosong.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/bidang-bimbingan/tambah-bidang-bimbingan', {
                bidang_bimbingan: namaBidang
            });
            setSuccess(response.data.msg);
            setError('');
            setTimeout(() => navigate('/dashboard/admin/bidang-bimbingan'), 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan bidang bimbingan';
            console.error('Terjadi kesalahan:', errorMsg);
            setError(errorMsg);
            setSuccess('');
        } finally {
            setIsLoading(false);
            // Timeout to clear messages; no need for cleanup here
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="namaBidang" sx={{ mt: 0, mb: 1 }}>
                            Bidang Bimbingan
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconClipboardText /></InputAdornment>}
                        id="namaBidang"
                        name="namaBidang"
                        value={namaBidang}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={isLoading} />
                        <CancelButton onClick={handleCancel}>Batal</CancelButton>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default TambahBidangForm;
