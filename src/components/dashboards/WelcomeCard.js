import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/welcome-bg2.png';

const WelcomeCard = () => {
  const user = useSelector((state) => state.user); 

  return (
    <Card elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h4">Welcome back {user ? user.name : 'Guest'} !</Typography>
              <Typography variant="subtitle2" my={2} color="textPrimary">
                Semoga Harimu Menyenangkan
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box mb="-90px">
              <img src={welcomeImg} alt="Welcome" width={'300px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
