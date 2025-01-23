import { useState } from "react";
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
import { IconBookmarks } from '@tabler/icons'; 
import { useMutation } from '@tanstack/react-query';
import axiosInstance from "src/utils/axiosInstance";

const TambahTingkatForm = ({ setSuccess, setError }) => {
    const [namaTingkat, setNamaTingkat] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newTingkat) => {
            const response = await axiosInstance.post('/api/v1/tingkat', {
                nama_tingkat: newTingkat
            });
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate('/dashboard/admin-sekolah/tingkat'), 3000);
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || []; 
            const errorMsg = errorDetails.length > 0 
                ? errorDetails.join(', ') 
                : error.response?.data?.msg || 'Terjadi kesalahan';
            setError(errorMsg)
        },
        onSettled: () => {
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
        }
    });

    const handleChange = (event) => {
        setNamaTingkat(event.target.value)
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!namaTingkat) {
            setError("Nama tingkat kelas tidak boleh kosong");
            return;
        }
        mutation.mutate(namaTingkat);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
        sx={{ mt: -4}}
    >
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center">
                <CustomFormLabel htmlFor="namaTingkat" sx={{ mt: 0, mb: 1 }}>
                    Tingkatan Kelas
                </CustomFormLabel>
                </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconBookmarks /></InputAdornment>}
                        id="namaTingkat"
                        name="namaTingkat"
                        value={namaTingkat}
                        onChange={handleChange}
                        placeholder="7,8,9/VII,VIII,IX"
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
    </Box>
    );
};

export default TambahTingkatForm;