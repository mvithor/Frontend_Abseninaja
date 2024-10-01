import React from 'react';
import { TextField } from '@mui/material';

const SearchButton = ({ value, onChange, ...props }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      onChange={onChange}
      InputProps={{
        sx: { padding: "3px" },
      }}
      sx={{
        flexGrow: 0,
        marginRight: 2,
        width: { xs: '100%', sm: 'auto' }, // Full width on small screens, auto on larger screens
        fontSize: { xs: '0.875rem', sm: '1rem' }, // Adjust font size for smaller screens
      }}
      {...props} // Menyebarkan properti tambahan
    />
  );
};

export default SearchButton;
