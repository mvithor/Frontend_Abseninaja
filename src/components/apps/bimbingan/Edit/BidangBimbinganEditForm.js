import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment} from '@mui/material';
import { IconClipboardText } from '@tabler/icons';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const BidangBimbinganEditForm = ({bidang, handleChange, handleSubmit, handleCancel, isLoading}) => {
    const [bidangData, setBidangData] = useState(bidang);

    useEffect(() => {
        setBidangData(bidang);
    }, [bidang]);

    const onChange = (event) => {
        setBidangData({
            ...bidangData,
            [event.target.name]: event.target.value
        });
        handleChange(event);
    };

    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, bidangData)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="bidang_bimbingan" sx={{ mt: 0, mb: 1 }}>
                    Bidang Bimbingan
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                fullWidth
                id="bidang_bimbingan"
                name="bidang_bimbingan"
                value={bidangData.bidang_bimbingan || ''}
                onChange={onChange}
                variant="outlined"
                startAdornment={<InputAdornment position="start"><IconClipboardText /></InputAdornment>}
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

export default BidangBimbinganEditForm;