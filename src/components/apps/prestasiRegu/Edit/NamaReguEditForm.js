import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment} from '@mui/material';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import { IconBuildingCommunity } from '@tabler/icons';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const NamaReguEditForm = ({regu, handleChange, handleSubmit, handleCancel, isLoading}) => {
    const [reguData, setReguData] = useState(regu);

    useEffect(() => {
        setReguData(regu);
    }, [regu]);

    const onChange = (event) => {
        setReguData({
            ...reguData,
            [event.target.name]: event.target.value
        });
        handleChange(event);
    };

    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, reguData)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="nama_regu" sx={{ mt: 0, mb: 1 }}>
                    Nama Tim
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                fullWidth
                id="nama_regu"
                name="nama_regu"
                value={reguData.nama_regu || ''}
                onChange={onChange}
                variant="outlined"
                startAdornment={<InputAdornment position="start"><IconBuildingCommunity /></InputAdornment>}
                />
            </Grid>
            <Grid item xs={12}>
               <SubmitButton isLoading={isLoading}/>
               <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Grid>
            </Grid>
        </Box>
    );
};

export default NamaReguEditForm;