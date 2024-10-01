import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment} from '@mui/material';
import { IconStars } from '@tabler/icons';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const KategoriPoinEditForm = ({poin, handleChange, handleSubmit, handleCancel, isLoading}) => {
    const [poinData, setPoinData] = useState(poin);

    useEffect(() => {
        setPoinData(poin);
    }, [poin]);

    const onChange = (event) => {
        setPoinData({
            ...poinData,
            [event.target.name]: event.target.value
        });
        handleChange(event);
    };

    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, poinData)}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="nama_kategori" sx={{ mt: 0, mb: 1 }}>
                    Kategori Poin
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                fullWidth
                id="nama_kategori"
                name="nama_kategori"
                value={poinData.nama_kategori || ''}
                onChange={onChange}
                variant="outlined"
                startAdornment={<InputAdornment position="start"><IconStars /></InputAdornment>}
                />
                </Grid>
                <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                <SubmitButton isLoading={isLoading}/>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
                </Box>
            </Grid>
            </Grid>
        </Box>
    );
};

export default KategoriPoinEditForm;