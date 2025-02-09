import React from 'react';
import { Box, Grid } from '@mui/material';
import WelcomeCard from 'src/components/dashboards/WelcomeCard';


const Pegawai = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12} lg={8}>
        {/* <TopPerformers /> */}
        </Grid>
        </Grid>
    </Box>
  );
};

export default Pegawai;
