import React from 'react';
import { Box, Grid } from '@mui/material';
// import TopCards from '../../components/dashboards/TopCards';
import WelcomeCard from 'src/components/dashboards/WelcomeCard';
// import EmployeeSalary from '../../components/dashboards/EmployeeSalary';
// import TopPerformers from '../../components/dashboards/TopPerformers';

const Admin = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <WelcomeCard />
          {/* <TopCards /> */}
        </Grid>
        {/* <Grid item xs={12} lg={8}>
        <TopPerformers />
          
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={12}>
            <EmployeeSalary />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
             
            </Grid>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Admin;
