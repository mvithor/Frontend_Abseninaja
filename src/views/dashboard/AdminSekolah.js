import React from 'react';
import { Box, Grid } from '@mui/material';
import TopCards from '../../components/dashboardsAdminSekolah/TopCards';
// import WelcomeCard from 'src/components/dashboards/WelcomeCard';
// import TopPerformers from '../../components/dashboards/TopPerformers';

const AdminSekolah = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          {/* <WelcomeCard /> */}
          <TopCards />
        </Grid>
        <Grid item xs={12} lg={8}>
        {/* <TopPerformers /> */}
        </Grid>
        </Grid>
    </Box>
  );
};

export default AdminSekolah;
