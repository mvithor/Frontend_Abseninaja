import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import icon1 from '../../assets/images/svgs/icon-user-male.svg';
import icon2 from '../../assets/images/svgs/icon-briefcase.svg';

// Dummy value for konselorCount
const pelanggaranCount = 30;
const prestasiCount = 10;

const topcards = [
  {
    href: '/dashboard/siswa/prestasi',
    icon: icon1,
    title: prestasiCount,
    digits: '20',
    bgcolor: 'primary',
  },
  {
    href: '/dashboard/siswa/pelanggaran',
    icon: icon2,
    title: 'Pelanggaran',
    digits: pelanggaranCount,
    bgcolor: 'warning',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
          <Link to={topcard.href} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                bgcolor: `${topcard.bgcolor}.light`,
                textAlign: 'center',
                boxShadow: 1,
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <img src={topcard.icon} alt={topcard.title} width="50" style={{ justifyContent: 'center' }} />
              <Typography variant="subtitle1" mt={1} fontWeight={600}>
                {topcard.title}
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
