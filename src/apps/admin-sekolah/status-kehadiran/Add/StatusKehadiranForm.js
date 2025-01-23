import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import { IconAccessPoint } from '@tabler/icons'; 
import { useMutation } from '@tanstack/react-query';
import axiosInstance from "src/utils/axiosInstance";

const StatusKehadiranForm = ({ setSuccess, setError }) => {
    const [namaStatus, setNamaStatus] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newStatusKehadiran) => {
            const response = await axiosInstance.post('/api/v1/status-kehadiran', {
                nama_status: newStatusKehadiran
            });
            return response.data
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate('/dashboard/admin-sekolah/status-kehadiran'), 3000);
        },
        onError: (error) => {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan status kehadiran';
            const errorDetails = error.response?.data?.errors || [];
            if (errorDetails.length > 0) {
                setError(errorDetails.map(err => err.message).join(', '));  
            } else {
                setError(errorMsg);
            }
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
            setError("Status Kehadiran tidak boleh kosong");
            return;
        }
        mutation.mutate(namaStatus);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -5}}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="namaStatus" sx={{ mt: 1 }}>
                        Status Kehadiran
                    </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconAccessPoint/></InputAdornment>}
                        id="namaStatus"
                        name="namaStatus"
                        value={namaStatus}
                        onChange={handleChange}
                        placeholder="Masukkan Status Kehadiran"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={mutation.isLoading} />
                        <CancelButton onClick={handleCancel}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatusKehadiranForm;