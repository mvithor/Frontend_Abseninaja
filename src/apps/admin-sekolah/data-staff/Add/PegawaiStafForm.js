import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  Typography,
  IconButton,
  MenuItem,
  Divider
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IconLock,
  IconUser,
  IconMail,
  IconPhone,
  IconId,
  IconBrandTelegram,
} from "@tabler/icons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import axiosInstance from "src/utils/axiosInstance";

const PegawaiStafForm = ({ setSuccess, setError }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        nip: '',
        kategori_pegawai_id: '',
        subkategori_pegawai_id: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        nomor_telepon: ''
    });

     // Fetch kategori options
     const { data: kategoriOptions = [], isError: kategoriError } = useQuery({
        queryKey: ["kategoriOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/kategori-pegawai');
            return response.data.data;
        }
    });

    // Fetch sub-kategori options based on selected kategori
    const { data: subKategoriOptions = [], isError: subKategoriError, refetch: refetchSubKategori } = useQuery({
        queryKey: ["subKategoriOptions", formState.kategori_pegawai_id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/kategori-pegawai/${formState.kategori_pegawai_id}/subkategori`);
            return response.data.data.sort((a, b) => a.nama_subkategori.localeCompare(b.nama_subkategori));
        },
        enabled: !!formState.kategori_pegawai_id 
    });

    const mutation = useMutation({
        mutationKey: ["tambahStaf"],
        mutationFn: async (newStaf) => {
            const response = await axiosInstance.post("/api/v1/pegawai", newStaf);
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate("/dashboard/admin-sekolah/pegawai/staf"), 3000);
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || []; 
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan data pegawai';
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

        if (name === 'kategori_pegawai_id') {
            setFormState((prevState) => ({
                ...prevState,
                subkategori_pegawai_id: ''
            }));
            refetchSubKategori(); 
        }
    };

    const handleDateChange = (date) => {
        setFormState((prevState) => ({
            ...prevState,
            tanggal_lahir: date
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate(formState);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (kategoriError || subKategoriError) {
        return <div>Error loading data...</div>;
    };

    return (
        <Box component="form" onSubmit={handleSubmit} 
            sx={{ mt: -2 }}
        >
            <Box sx={{ borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mt: 4}}>
                    Detail Akun
                </Typography>
                <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="name" sx={{ mt: 2 }}>Nama Staf</CustomFormLabel>
                        <CustomOutlinedInput
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="email" sx={{ mt: 1.85 }}>Email</CustomFormLabel>
                        <CustomOutlinedInput
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconMail /></InputAdornment>}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="password" sx={{ mt: 1.85 }}>Password</CustomFormLabel>
                        <CustomOutlinedInput
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            required
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            startAdornment={<InputAdornment position="start"><IconLock /></InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="nip" sx={{ mt: 1.85 }}>NIP</CustomFormLabel>
                        <CustomOutlinedInput
                            id="nip"
                            name="nip"
                            value={formState.nip}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconId /></InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" sx={{ my: 4, width: "100%" }} />
                <Typography variant="h6">
                    Data Pribadi
                </Typography>
                <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="kategori_pegawai_id" sx={{ mt: 1.85 }}>Kategori Pegawai</CustomFormLabel>
                        <CustomSelect
                            id="kategori_pegawai_id"
                            name="kategori_pegawai_id"
                            value={formState.kategori_pegawai_id}
                            onChange={handleChange}
                            fullWidth
                        >
                            {kategoriOptions.map((kategoriOption) => (
                                <MenuItem key={kategoriOption.id} value={kategoriOption.id}>
                                    {kategoriOption.nama_kategori}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="subkategori_pegawai_id" sx={{ mt: 1.85 }}>Subkategori Pegawai</CustomFormLabel>
                        <CustomSelect
                            id="subkategori_pegawai_id"
                            name="subkategori_pegawai_id"
                            value={formState.subkategori_pegawai_id}
                            onChange={handleChange}
                            fullWidth
                        >
                            {subKategoriOptions.map((subKategoriOption) => (
                                <MenuItem key={subKategoriOption.id} value={subKategoriOption.id}>
                                    {subKategoriOption.nama_subkategori}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="tempat_lahir" sx={{ mt: 1.85 }}>Tempat Lahir</CustomFormLabel>
                        <CustomOutlinedInput
                            id="tempat_lahir"
                            name="tempat_lahir"
                            value={formState.tempat_lahir}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconId /></InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="tanggal_lahir" sx={{ mt: 1.85 }}>Tanggal Lahir</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(props) => (
                                    <CustomTextField
                                        {...props}
                                        fullWidth
                                        size="medium"
                                    />
                                )}
                                placeholder="Tanggal Lahir"
                                value={formState.tanggal_lahir}
                                onChange={handleDateChange}
                                required
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="alamat" sx={{ mt: 1.85 }}>Alamat</CustomFormLabel>
                        <CustomOutlinedInput
                            id="alamat"
                            name="alamat"
                            value={formState.alamat}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconBrandTelegram /></InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="nomor_telepon" sx={{ mt: 1.85 }}>Nomor Telepon</CustomFormLabel>
                        <CustomOutlinedInput
                            id="nomor_telepon"
                            name="nomor_telepon"
                            value={formState.nomor_telepon}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconPhone /></InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
                <SubmitButton isLoading={mutation.isLoading}>Tambah Staf</SubmitButton>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Box>
        </Box>
    );
};

export default PegawaiStafForm;