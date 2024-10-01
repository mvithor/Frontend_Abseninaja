import React from 'react';
import { Grid, Box, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';

const DateInput = ({ id, name, value, onChange }) => (
  <Grid item xs={12}>
    <Box display="flex" alignItems="center">
      <CustomFormLabel htmlFor={id} sx={{ mt: 0, mb: 1 }}>
        Tanggal Lahir
      </CustomFormLabel>
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(params) => (
          <TextField
            {...params}
            id={id} 
            name={name}
            size="medium"
            sx={{
              '& .MuiSvgIcon-root': {
                width: 18,
                height: 18,
              },
              '& .MuiFormHelperText-root': {
                display: 'none',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'gray',
              },
            }}
            fullWidth
          />
        )}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  </Grid>
);

export default DateInput;
