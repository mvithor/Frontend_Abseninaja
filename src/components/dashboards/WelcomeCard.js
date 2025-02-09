import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Grid, useTheme } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/welcome-bg2.png';

const WelcomeCard = () => {
  const user = useSelector((state) => state.user);
  const theme = useTheme(); // Ambil mode tema

  return (
    <Card 
      elevation={0} 
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.primary.light // Warna biru lembut pada dark mode
          : 'white', // Warna putih pada light mode
        py: 0 
      }}
    >
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
