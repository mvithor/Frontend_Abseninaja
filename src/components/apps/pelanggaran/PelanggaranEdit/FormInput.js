import React from 'react';
import { Grid, Box, InputAdornment } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';

const FormInput = ({ label, id, name, value, onChange, icon }) => (
  <Grid item xs={12}>
    <Box display="flex" alignItems="center">
      <CustomFormLabel htmlFor={id} sx={{ mt: 0, mb: 1 }}>
        {label}
      </CustomFormLabel>
    </Box>
    <CustomOutlinedInput
      startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
    />
  </Grid>
);

export default FormInput;
