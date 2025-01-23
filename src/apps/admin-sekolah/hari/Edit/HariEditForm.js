import React from "react";
import {
  Grid,
  Box,
  InputAdornment,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { IconCalendar } from "@tabler/icons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const kategoriHariOptions = [
    { value: "KBM", label: "KBM" },
    { value: "Ekstrakurikuler", label: "Ekstrakurikuler" },
    { value: "Libur", label: "Libur" },
    { value: "Pulang Cepat", label: "Pulang Cepat" },
];

const isAktifOptions = [
    { value: 'true', label: "Aktif" },
    { value: 'false', label: "Nonaktif" },
];

const HariEditForm = ({ 
    hariData,
    handleChange,
    handleDateChange,
    handleSubmit,
    handleCancel,
    isLoading
}) => {

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomFormLabel htmlFor="nama_hari" sx={{ mt: 1 }}>Nama Hari</CustomFormLabel>
                    <CustomOutlinedInput
                        id="nama_hari"
                        name="nama_hari"
                        value={hariData.nama_hari || ""}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconCalendar />
                            </InputAdornment>
                        }
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomFormLabel htmlFor="kategori_hari" sx={{ mt: 1 }}>Kategori Hari</CustomFormLabel>
                    <CustomSelect
                        id="kategori_hari"
                        name="kategori_hari"
                        value={hariData.kategori_hari}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        <MenuItem value="">Pilih Kategori</MenuItem>
                        {kategoriHariOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
                {hariData.kategori_hari !== "KBM" && (
                    <Grid item xs={12}>
                        <CustomFormLabel htmlFor="tanggal_khusus" sx={{ mt: 1 }}>Tanggal Khusus</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(params) => (
                                    <CustomTextField {...params} fullWidth size="medium" />
                                )}
                                placeholder="Tanggal Khusus"
                                value={hariData.tanggal_khusus}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <CustomFormLabel htmlFor="is_aktif" sx={{ mt: 1 }}>Status Aktif</CustomFormLabel>
                    <CustomSelect
                        id="is_aktif"
                        name="is_aktif"
                        value={hariData.is_aktif?.toString()}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        <MenuItem value="">Pilih Status</MenuItem>
                        {isAktifOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                    <CustomFormLabel htmlFor="deskripsi_hari" sx={{ mt: 1 }}>Deskripsi Hari</CustomFormLabel>
                    <CustomOutlinedInput
                        id="deskripsi_hari"
                        name="deskripsi_hari"
                        value={hariData.deskripsi_hari || ""}
                        onChange={handleChange}
                        multiline
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", pt: 3 }}>
                        <SubmitButton isLoading={isLoading} />
                        <CancelButton onClick={handleCancel}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HariEditForm;
