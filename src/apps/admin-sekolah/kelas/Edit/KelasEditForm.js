import React from "react";
import { 
    Grid, 
    Box, 
    InputAdornment,
    MenuItem, 
    CircularProgress 
} from "@mui/material";
import { IconBuilding } from "@tabler/icons";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";

const KelasEditForm = ({
    KelasData,
    handleChange,
    handleSubmit,
    handleCancel,
    isLoading
}) => {
    const { data: tingkatOptions = [], isLoading: isTingkatLoading } = useQuery({
        queryKey: ["kelasOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/v1/tingkat');
            return response.data.data;
        }
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -5 }}>
            <Grid container spacing={2} rowSpacing={1}>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="nama_kelas" sx={{ mt: 1.85 }}>Nama Kelas</CustomFormLabel>
                    <CustomOutlinedInput
                        id="nama_kelas"
                        name="nama_kelas"
                        value={KelasData.nama_kelas || ""}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconBuilding />
                            </InputAdornment>
                        }
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomFormLabel htmlFor="tingkat_id" sx={{ mt: 1.85 }}>Tingkat</CustomFormLabel>
                    <CustomSelect
                        id="tingkat_id"
                        name="tingkat_id"
                        value={tingkatOptions.length > 0 ? KelasData.tingkat_id : ""}
                        onChange={handleChange}
                        fullWidth
                        required
                        displayEmpty
                        inputProps={{ "aria-label": "Pilih Tingkat" }}
                    >
                        <MenuItem value="" disabled>
                            {isTingkatLoading ? "Memuat..." : "Pilih Tingkat"}
                        </MenuItem>
                        {tingkatOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.nama_tingkat}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", pt: 3 }}>
                        <SubmitButton isLoading={isLoading} />
                        <CancelButton onClick={handleCancel}>Batal</CancelButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default KelasEditForm;
