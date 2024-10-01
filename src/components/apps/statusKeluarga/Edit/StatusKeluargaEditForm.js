import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment} from '@mui/material';
import { IconIdBadge2 } from '@tabler/icons';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const StatusKeluargaEditForm = ({status, handleChange, handleSubmit, handleCancel, isLoading}) => {
    const [statusData, setStatusData] = useState(status);

    useEffect(() => {
        setStatusData(status);
    }, [status]);

    const onChange = (event) => {
        setStatusData({
            ...statusData,
            [event.target.name]: event.target.value
        });
        handleChange(event);
    };

    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, statusData)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="nama_status" sx={{ mt: 0, mb: 1 }}>
                      Status Keluarga
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                fullWidth
                id="nama_status"
                name="nama_status"
                value={statusData.nama_status || ''}
                onChange={onChange}
                variant="outlined"
                startAdornment={<InputAdornment position="start"><IconIdBadge2 /></InputAdornment>}
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

export default StatusKeluargaEditForm;
