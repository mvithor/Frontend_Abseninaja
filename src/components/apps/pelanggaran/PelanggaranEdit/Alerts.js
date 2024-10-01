import React from 'react';
import { Box, Alert } from '@mui/material';

const Alerts = ({ error, success }) => {
  return (
    <Box justifyContent={'center'} mb={3}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default Alerts;
