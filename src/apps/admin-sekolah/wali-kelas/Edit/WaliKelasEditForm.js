import React from "react";
import {
    Grid,
    Box,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";

const WaliKelasEditForm = ({
    waliKelasData,
    handleChange, 
    handleSubmit,
    handleCancel,
    isLoading
}) => {
    const { data: pegawaiOptions = [], isLoading: isPegawaiLoading } = useQuery({
        queryKey: ["pegawaiOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/dropdown/guru');
            return response.data.data;
        }
    });

    const { data: kelasOptions = [], isLoading: isKelasLoading } = useQuery({
        queryKey: ["kelasOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/dropdown/kelas');
            return response.data.data;
        }
    });

    if (isLoading || isPegawaiLoading || isKelasLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4 }}>
            <Grid container spacing={2} rowSpacing={1}>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="pegawai_id" sx={{ mt: 1.85 }}>
                        Nama Guru
                    </CustomFormLabel>
                    <CustomSelect
                        id="pegawai_id"
                        name="pegawai_id"
                        value={waliKelasData.pegawai_id || ""}
                        onChange={handleChange}
                        fullWidth
                    >
                        {isPegawaiLoading ? (
                            <MenuItem value="">Memuat...</MenuItem>
                        ) : (
                            pegawaiOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nama}
                                </MenuItem>
                            ))
                        )}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="kelas_id" sx={{ mt: 1.85 }}>
                        Kelas
                    </CustomFormLabel>
                    <CustomSelect
                        id="kelas_id"
                        name="kelas_id"
                        value={waliKelasData.kelas_id || ""}
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
            </Grid>
            <Box sx={{ mt: 4 }}>
                <SubmitButton type="submit"/>
                <CancelButton onClick={handleCancel}/>
            </Box>
        </Box>
    );
};

export default WaliKelasEditForm;
