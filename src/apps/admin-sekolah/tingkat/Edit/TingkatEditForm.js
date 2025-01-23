import React from "react";
import { Grid, Box, InputAdornment, CircularProgress } from "@mui/material";
import { IconBookmarks } from "@tabler/icons";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const TingkatEditForm = ({ tingkatData, handleChange, handleSubmit, handleCancel, isLoading }) => {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="40px">
                <CircularProgress />
            </Box>
        );
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{ mt: -4 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nama_tingkat" sx={{ mt: 0, mb: 1 }}>
                            Tingkat Kelas
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        fullWidth
                        id="nama_tingkat"
                        name="nama_tingkat"
                        value={tingkatData?.nama_tingkat || ''}  
                        onChange={handleChange}
                        variant="outlined"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconBookmarks />
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

export default TingkatEditForm;