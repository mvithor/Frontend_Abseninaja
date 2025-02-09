import React from "react";
import { Grid, Box, InputAdornment, CircularProgress } from "@mui/material";
import { IconNumbers, IconBook2 } from "@tabler/icons"
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const MataPelajaranEditForm = ({ mapelData, handleChange, handleSubmit, handleCancel, isLoading }) => {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{ mt: -4.5 }}
        >
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="kode_mapel" sx={{ mt: 0, mb: 1 }}>
                        Kode Mata Pelajaran
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                    fullWidth
                    id="kode_mapel"
                    name="kode_mapel"
                    value={mapelData?.kode_mapel || ''}  
                    onChange={handleChange}
                    variant="outlined"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconNumbers />
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="nama_mapel" sx={{ mt: 0, mb: 1 }}>
                        Mata Pelajaran
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                    fullWidth
                    id="nama_mapel"
                    name="nama_mapel"
                    value={mapelData?.nama_mapel || ''}  
                    onChange={handleChange}
                    variant="outlined"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconBook2 />
                        </InputAdornment>
                    }
                />
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

export default MataPelajaranEditForm;
