import React from "react";
import {
    Grid,
    Box,
    InputAdornment,
    CircularProgress,
    MenuItem,
    TextField,
} from "@mui/material";
import axiosInstance from "src/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IconIdBadge2, IconUser, IconMail } from "@tabler/icons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const SiswaEditForm = ({ siswaData, handleChange, handleSubmit, handleCancel, isLoading }) => {
    const { data: kelasOptions = [], isLoading: isKelasLoading } = useQuery({
        queryKey: ["kelasOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get("/api/v1/dropdown/kelas");
            return response.data.data;
        },
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -6 }}>
            <Box sx={{ borderRadius: 2, mt: 0 }}>
                <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6} >
                        <CustomFormLabel htmlFor="name" sx={{ mt: 3 }}>Nama Siswa</CustomFormLabel>
                        <CustomOutlinedInput
                            id="name"
                            name="name"
                            value={siswaData.name || ""}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconUser />
                                </InputAdornment>
                            }
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="email" sx={{ mt: 3 }}>Email</CustomFormLabel>
                        <CustomOutlinedInput
                            id="email"
                            name="email"
                            value={siswaData.email || ""}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconMail />
                                </InputAdornment>
                            }
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="nis" sx={{ mt: 1.85 }}>NISN</CustomFormLabel>
                        <CustomOutlinedInput
                            id="nis"
                            name="nis"
                            value={siswaData.nis || ""}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconIdBadge2 />
                                </InputAdornment>
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="kelas_id" sx={{ mt: 1.85 }}>Kelas</CustomFormLabel>
                        <CustomSelect
                            id="kelas_id"
                            name="kelas_id"
                            value={siswaData.kelas_id || ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            {isKelasLoading ? (
                                <MenuItem value="">Memuat...</MenuItem>
                            ) : (
                                kelasOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nama_kelas}
                                    </MenuItem>
                                ))
                            )}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="tempat_lahir" sx={{ mt: 1.85 }}>Tempat Lahir</CustomFormLabel>
                        <CustomOutlinedInput
                            id="tempat_lahir"
                            name="tempat_lahir"
                            value={siswaData.tempat_lahir || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="tanggal_lahir" sx={{ mt: 1.85 }}>Tanggal Lahir</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={siswaData.tanggal_lahir || null}
                                onChange={(date) =>
                                    handleChange({ target: { name: "tanggal_lahir", value: date } })
                                }
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="kode_qr" sx={{ mt: 1.85 }}>QR Code</CustomFormLabel>
                        <CustomOutlinedInput
                            id="kode_qr"
                            name="kode_qr"
                            value={siswaData.kode_qr || ""}
                            onChange={handleChange}
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="jenis_kelamin" sx={{ mt: 1.85 }}>Jenis Kelamin</CustomFormLabel>
                        <CustomSelect
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            value={siswaData.jenis_kelamin || ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="laki-laki">Laki-laki</MenuItem>
                            <MenuItem value="perempuan">Perempuan</MenuItem>
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="alamat" sx={{ mt: 1.5 }}>Alamat</CustomFormLabel>
                        <CustomOutlinedInput
                            id="alamat"
                            name="alamat"
                            value={siswaData.alamat || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="nomor_telepon_siswa" sx={{ mt: 1.5 }}>Nomor Telepon</CustomFormLabel>
                        <CustomOutlinedInput
                            id="nomor_telepon_siswa"
                            name="nomor_telepon_siswa"
                            value={siswaData.nomor_telepon_siswa || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
                <SubmitButton type="submit">Simpan</SubmitButton>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Box>
        </Box>
    );
};

export default SiswaEditForm;