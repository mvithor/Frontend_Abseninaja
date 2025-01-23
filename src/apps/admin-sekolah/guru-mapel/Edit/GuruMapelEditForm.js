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

const GuruMapelEditForm = ({
    guruMapelData,
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

    const { data: mapelOptions = [], isLoading: isMapelLoading } = useQuery({
        queryKey: ["mapelOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/mata-pelajaran');
            return response.data.data;
        }
    });

    if (isLoading || isPegawaiLoading || isMapelLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4.5}}>
            <Grid container spacing={2} rowSpacing={1}>
            <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="pegawai_id" sx={{ mt: 1 }}>
                        Nama Guru
                    </CustomFormLabel>
                    <CustomSelect
                        id="pegawai_id"
                        name="pegawai_id"
                        value={guruMapelData.pegawai_id || ""}
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
                    <CustomFormLabel htmlFor="mata_pelajaran_id" sx={{ mt: 1 }}>
                        Kelas
                    </CustomFormLabel>
                    <CustomSelect
                        id="mata_pelajaran_id"
                        name="mata_pelajaran_id"
                        value={guruMapelData.mata_pelajaran_id || ""}
                        onChange={handleChange}
                        fullWidth
                    >
                        {isMapelLoading ? (
                            <MenuItem value="">Memuat...</MenuItem>
                        ) : (
                            mapelOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nama_mapel}
                                </MenuItem>
                            ))
                        )}
                    </CustomSelect>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <SubmitButton type="submit">Simpan</SubmitButton>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Box>
        </Box>
    );
};

export default GuruMapelEditForm;