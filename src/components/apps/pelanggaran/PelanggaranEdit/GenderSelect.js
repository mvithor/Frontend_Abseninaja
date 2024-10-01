import React from 'react';
import { Grid, Box, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { IconUsers } from '@tabler/icons';

const GenderSelect = ({ id, name, value, onChange }) => (
  <Grid item xs={12}>
    <Box display="flex" alignItems="center">
      <CustomFormLabel htmlFor={id} sx={{ mt: 0, mb: 1 }}>
        Jenis Kelamin
      </CustomFormLabel>
    </Box>
    <FormControl fullWidth>
      <InputLabel id={`${id}_label`}>Jenis Kelamin</InputLabel>
      <Select
        labelId={`${id}_label`}
        id={id} 
        name={name}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <IconUsers size="20" />
          </InputAdornment>
        }
        label="Jenis Kelamin"
      >
        <MenuItem value={1}>Laki-Laki</MenuItem>
        <MenuItem value={2}>Perempuan</MenuItem>
      </Select>
    </FormControl>
  </Grid>
);

export default GenderSelect;
