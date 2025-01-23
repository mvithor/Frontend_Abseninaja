import React, { useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import { IconIdBadge2 } from '@tabler/icons'; 
import { useMutation } from '@tanstack/react-query';

const TambahStatusKerjaSamaForm = ({ setSuccess, setError }) => {
    const [namaStatus, setNamaStatus] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newStatus) => {
            const response = await axiosInstance.post('/api/v1/status', {
                status_kerja_sama: newStatus
            });
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate('/dashboard/admin/status'), 3000);
        },
        onError: (error) => {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan status keluarga';
            console.error('Terjadi kesalahan:', errorMsg);
            setError(errorMsg);
            setSuccess('');
        },
        onSettled: () => {
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
        }
    });

    const handleChange = (event) => {
        setNamaStatus(event.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!namaStatus) {
            setError("Nama status kerja sama tidak boleh kosong");
            return;
        }

        // Call the mutation
        mutation.mutate(namaStatus);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="namaStatus" sx={{ mt: 0, mb: 1 }}>
                        Status Kerja Sama
                    </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconIdBadge2 /></InputAdornment>}
                        id="namaStatus"
                        name="namaStatus"
                        value={namaStatus}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={mutation.isLoading} />
                        <CancelButton onClick={handleCancel}>Batal</CancelButton>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default TambahStatusKerjaSamaForm;