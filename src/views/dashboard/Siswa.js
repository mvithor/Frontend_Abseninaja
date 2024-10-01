import React from 'react';
import { Box, Grid } from '@mui/material';
import TopCards from 'src/components/dashboardSiswa/TopCardsSiswa';
import PoinCards from 'src/components/dashboardSiswa/PoinCards';
import WelcomeCard from 'src/components/dashboards/WelcomeCard';

const Siswa = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* WelcomeCard and PoinCards */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <WelcomeCard />
            </Grid>
            <Grid item xs={12}>
              <PoinCards />
            </Grid>
          </Grid>
        </Grid>
        {/* YearlyBreakup and MonthlyEarnings */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TopCards />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Siswa;
