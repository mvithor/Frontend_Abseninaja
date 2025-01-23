import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import axiosInstance from "src/utils/axiosInstance";

const TambahGuruMapelForm = ({ setSuccess, setError }) => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        pegawai_id: '',
        mata_pelajaran_id: ''
    });

    // Fetch pegawai
    const { data: pegawaiOptions = [], isError: pegawaiError } = useQuery({
        queryKey: ["pegawaiOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/dropdown/guru');
            return response.data.data
        }
    });

    // Fetch pegawai
    const { data: mapelOptions = [], isError: mapelError } = useQuery({
        queryKey: ["mapelOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/mata-pelajaran');
            return response.data.data
        }
    });

    const mutation = useMutation({
        mutationKey: ["tambahGuruMapel"],
        mutationFn: async (newGuruMapel) => {
            const response = await axiosInstance.post('/api/v1/guru-mapel', newGuruMapel);
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate('/dashboard/admin-sekolah/guru-mapel'), 3000)
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || []; 
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan guru mata pelajaran';
            if (errorDetails.length > 0) {
                setError(errorDetails.join(', '));
            } else {
                setError(errorMsg);
            }
            setSuccess('');
            setTimeout(() => setError(''), 3000); 
        },
        onSettled: () => {
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
        }
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
        mutation.mutate(formState);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (pegawaiError || mapelError) {
        return <div>Error loading data...</div>;
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{ mt: -4}}
        >
            <Grid container spacing={2} rowSpacing={1}>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="pegawai_id" sx={{ mt: 1 }}>Nama Guru</CustomFormLabel>
                        <CustomSelect
                            id="pegawai_id"
                            name="pegawai_id"
                            value={formState.pegawai_id}
                            onChange={handleChange}
                            fullWidth
                            required
                            displayEmpty
                            inputProps={{ "aria-label": "Pilih Guru" }}
                        >
                            <MenuItem value="" disabled>
                                Pilih Guru
                            </MenuItem>
                            {pegawaiOptions.map((pegawaiOption) => (
                            <MenuItem key={`pegawai-${pegawaiOption.id}`} value={pegawaiOption.id}>
                                {pegawaiOption.nama}
                            </MenuItem>
                            ))}
                        </CustomSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="mata_pelajaran_id" sx={{ mt: 1 }}>Mata Pelajaran</CustomFormLabel>
                        <CustomSelect
                            id="mata_pelajaran_id"
                            name="mata_pelajaran_id"
                            value={formState.mata_pelajaran_id}
                            onChange={handleChange}
                            fullWidth
                            required
                            displayEmpty
                            inputProps={{ "aria-label": "Pilih Mata Pelajaran" }}
                        >
                            <MenuItem value="" disabled>
                                Pilih Mata Pelajaran
                            </MenuItem>
                            {mapelOptions.map((mapelOption) => (
                            <MenuItem key={mapelOption.id} value={mapelOption.id}>
                                {mapelOption.nama_mapel}
                            </MenuItem>
                            ))}
                        </CustomSelect>
                </Grid>
            </Grid>
                <Box sx={{ mt: 4 }}>
                    <SubmitButton isLoading={mutation.isLoading}>Simpan</SubmitButton>
                    <CancelButton onClick={handleCancel}>Batal</CancelButton>
                </Box>
        </Box>
    );
};

export default TambahGuruMapelForm;

