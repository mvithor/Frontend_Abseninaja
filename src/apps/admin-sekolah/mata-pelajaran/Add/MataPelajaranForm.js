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
import { IconBook2, IconNumbers } from '@tabler/icons'; 
import { useMutation } from '@tanstack/react-query';

const TambahMataPelajaranForm = ({ setSuccess, setError }) => {
    const navigate = useNavigate();
    const [formState ,setFormState] = useState ({
        kode_mapel: '',
        nama_mapel: ''
    });

    const mutation = useMutation({
        mutationKey: ["tambahMapel"],
        mutationFn: async (newMapel) => {
            const response = await axiosInstance.post('/api/v1/mata-pelajaran', newMapel);
            return response.data; 
        },
        onSuccess: (response) => {
            setSuccess(response.msg); 
            setTimeout(() => navigate("/dashboard/admin-sekolah/mata-pelajaran"), 3000);
        },
        onError: (error) => {
            console.log("Validation Errors:", error.response?.data?.errors || []);
            const errorDetails = error.response?.data?.errors || [];
            const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat menambahkan mata pelajaran";
            setError(errorDetails.length > 0 ? errorDetails.join(", ") : errorMsg);
            setSuccess('');
            setTimeout(() => setError(''), 3000);
        },
    });
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting formState:", formState); 
        mutation.mutate(formState);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{ mt: -4.5}}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="kode_mapel" sx={{ mt: 0, mb: 1 }}>
                            Kode Mata Pelajaran
                        </CustomFormLabel>
                        </Box>
                        <CustomOutlinedInput
                            startAdornment={<InputAdornment position="start"><IconNumbers /></InputAdornment>}
                            id="kode_mapel"
                            name="kode_mapel"
                            value={formState.kode_mapel}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nama_mapel" sx={{ mt: 0, mb: 1 }}>
                            Mata Pelajaran
                        </CustomFormLabel>
                        </Box>
                        <CustomOutlinedInput
                            startAdornment={<InputAdornment position="start"><IconBook2 /></InputAdornment>}
                            id="nama_mapel"
                            name="nama_mapel"
                            value={formState.nama_mapel}
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
        </Box>
    );
};

export default TambahMataPelajaranForm;