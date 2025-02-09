import React from "react";
import {
    Grid,
    Box,
    InputAdornment,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import { IconBuilding, IconUser } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import axiosInstance from "src/utils/axiosInstance";

const AbsensiEditForm = ({ absensiData, handleChange, handleSubmit, handleCancel, isLoading }) => {
    const { data: statusKehadiranOptions = [], isLoading: isStatusKehadiranLoading } = useQuery ({
        queryKey: ["statusKehadiranOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/dropdown/status-kehadiran');
            return response.data.data;
        }
    });

    // Format waktu menjadi HH:mm:ss
    const handleTimeChange = (field, value) => {
        if (value) {
            const formattedTime = `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}:${value.getSeconds().toString().padStart(2, '0')}`;
            handleChange({ target: { name: field, value: formattedTime } });
        } else {
            handleChange({ target: { name: field, value: "-" } });
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="nama" sx={{ mt: 1.85 }}>Nama Siswa</CustomFormLabel>
                        <CustomOutlinedInput
                            id="nama"
                            name="nama"
                            value={absensiData.nama || "-"}
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
                        <CustomFormLabel htmlFor="kelas" sx={{ mt: 1.85 }}>Kelas</CustomFormLabel>
                        <CustomOutlinedInput
                            id="kelas"
                            name="kelas"
                            value={absensiData.kelas || "-"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconBuilding />
                                </InputAdornment>
                            }
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="tanggal" sx={{ mt: 1.85 }}>Tanggal</CustomFormLabel>
                        <DatePicker
                            value={absensiData.tanggal || null}
                            onChange={(date) => handleChange({ target: { name: "tanggal", value: date } })}
                            renderInput={(params) => <CustomTextField {...params} fullWidth />}
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="status_kehadiran" sx={{ mt: 1.85 }}>Status Kehadiran</CustomFormLabel>
                        <CustomSelect
                            id="status_kehadiran"
                            name="status_kehadiran"
                            value={absensiData.status_kehadiran || ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Masuk', 'Izin', 'Sakit', 'Alpa', 'Hadir', 'Terlambat'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="jam_masuk" sx={{ mt: 1.85 }}>Jam Masuk</CustomFormLabel>
                        <TimePicker
                            ampm={false}
                            value={absensiData.jam_masuk && absensiData.jam_masuk !== "-" ? 
                                new Date(`1970-01-01T${absensiData.jam_masuk}`) : null}
                            onChange={(value) => handleTimeChange("jam_masuk", value)}
                            renderInput={(params) => <CustomTextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="jam_pulang" sx={{ mt: 1.85 }}>Jam Pulang</CustomFormLabel>
                        <TimePicker
                            ampm={false}
                            value={absensiData.jam_pulang && absensiData.jam_pulang !== "-" ? 
                                new Date(`1970-01-01T${absensiData.jam_pulang}`) : null}
                            onChange={(value) => handleTimeChange("jam_pulang", value)}
                            renderInput={(params) => <CustomTextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="status_custom_id" sx={{ mt: 1.85 }}>Keterangan</CustomFormLabel>
                        <CustomSelect
                            id="status_custom_id"
                            name="status_custom_id"
                            value={absensiData.status_custom_id || ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            {isStatusKehadiranLoading ? (
                                <MenuItem value="">Memuat...</MenuItem>
                            ) : (
                                statusKehadiranOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nama_status}
                                    </MenuItem>
                                ))
                            )}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="keterangan" sx={{ mt: 1.85 }}>Deskripsi</CustomFormLabel>
                        <CustomTextField
                            fullWidth
                            name="keterangan"
                            value={absensiData.keterangan || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
            <Box sx={{ mt: 4 }}>
                <SubmitButton type="submit">Simpan</SubmitButton>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Box>
        </Box>
    );
};

export default AbsensiEditForm;
