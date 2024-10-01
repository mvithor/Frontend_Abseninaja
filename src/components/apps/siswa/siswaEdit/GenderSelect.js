import React from 'react';
import { Grid, Box, InputAdornment, MenuItem } from '@mui/material';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { IconUsers } from '@tabler/icons';

const GenderSelect = ({ id, name, value, onChange }) => (
  <Grid item xs={12}>
    <Box display="flex" alignItems="center">
      <CustomFormLabel htmlFor={id} sx={{ mt: 0, mb: 1}}>
        Jenis Kelamin
      </CustomFormLabel>
    </Box>
    

      <CustomSelect
       
        id={id} 
        name={name}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <IconUsers/>
          </InputAdornment>
        }
        fullWidth
        variant="outlined"
        sx={{ width: '100%' }} 
      >
        <MenuItem value={1}>Laki-Laki</MenuItem>
        <MenuItem value={2}>Perempuan</MenuItem>
      </CustomSelect>
     

  </Grid>
);

export default GenderSelect;
