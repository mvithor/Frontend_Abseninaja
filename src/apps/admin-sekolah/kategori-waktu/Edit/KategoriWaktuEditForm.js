import React from "react";
import { 
    Grid, 
    Box, 
    InputAdornment,
    CircularProgress 
} from "@mui/material";
import { IconBuilding } from "@tabler/icons";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const KategoriWaktuEditForm = ({
    kategoriWaktuData,
    handleChange,
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nama_kategori" sx={{ mt: 0, mb: 1 }}>
                            Kategori Pegawai
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        fullWidth
                        id="nama_kategori"
                        name="nama_kategori"
                        value={kategoriWaktuData?.nama_kategori || ''}  
                        onChange={handleChange}
                        variant="outlined"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconBuilding />
                            </InputAdornment>
                        }
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

export default KategoriWaktuEditForm;