import React from 'react';
import { Button } from '@mui/material';

const AddButton = ({ icon, onClick, children, ...props }) => {
  return (
    <Button
      sx={{
        backgroundColor: "#F48C06",
        '&:hover': { backgroundColor: "#2F327D" },
        width: { xs: '100%', sm: 'auto' }, // Responsif untuk lebar tombol
        fontSize: { xs: '0.875rem', sm: '0.900rem' }, // Responsif untuk ukuran font
        padding: { xs: '8px 10px', sm: '6px 14px' } // Responsif untuk padding
      }}
      variant="contained"
      color="primary"
      startIcon={icon} // Ikon disesuaikan melalui props
      onClick={onClick}
      style={{ color: 'white' }}
      fullWidth // Pastikan tombol mengambil lebar penuh pada layar kecil
      {...props} // Menyebarkan properti tambahan
    >
      {children}
    </Button>
  );
};

export default AddButton;
