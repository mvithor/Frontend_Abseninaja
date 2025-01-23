import { useState } from "react";
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

const TambahKategoriPegawaiForm = ({ setSuccess, setError }) => {
    const [namaKategori, setNamaKategori] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newKategori) => {
            const response = await axiosInstance.post('/api/v1/kategori-pegawai', {
                nama_kategori: newKategori
            });
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate('/dashboard/admin-sekolah/kategori-pegawai'), 3000);
        },
        onError: (error) => {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan kategori pegawai';
            const errorDetails = error.response?.data?.error || [];
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
        setNamaKategori(event.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!namaKategori) {
            setError("Nama kategori tidak boleh kosong");
            return;
        }
        mutation.mutate(namaKategori);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -5}}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="namaKategori" sx={{ mt: 1 }}>
                        Kategori Pegawai
                    </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        startAdornment={<InputAdornment position="start"><IconIdBadge2 /></InputAdornment>}
                        id="namaKategori"
                        name="namaKategori"
                        value={namaKategori}
                        onChange={handleChange}
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

export default TambahKategoriPegawaiForm;