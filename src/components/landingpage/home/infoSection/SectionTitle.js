import React from 'react';
import { Grid, Typography, Box, Container, styled } from '@mui/material';
import AnimateFadeIn from '../animation/Animation';

import studentImage from '../../../../assets/images/landingpage/students.svg'; 

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: `url(${studentImage}) no-repeat center center`,
    backgroundSize: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
}));

const SectionTitle = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box>
          <AnimateFadeIn>
            <Typography
              variant="h2"
              fontWeight={700}
              gutterBottom
              sx={{ color: '#2F327D' }}
            >
              Apa itu <span style={{ color: '#F48C06' }}>Aspirasi Sekolah</span>?
            </Typography>
            </AnimateFadeIn>
            <AnimateFadeIn>
            <Typography
              variant="h5"
              fontWeight={500}
              sx={{ color: 'textPrimary', mt: 2 }}
            > 
              Aspirasi Sekolah adalah sebuah website bimbingan konseling yang dirancang untuk menyediakan ruang aman bagi siswa, 
              konselor, dan wali siswa untuk berbagi pemikiran, kekhawatiran, serta aspirasi terkait perkembangan siswa dan lingkungan sekolah. 
              Melalui platform ini, kami mendukung komunikasi terbuka dan memberikan sumber daya yang berguna 
              untuk membantu setiap individu mencapai potensi mereka secara pribadi dan akademis.
            </Typography>
            </AnimateFadeIn>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <AnimateFadeIn>
          <StyledBackground>
            
            <img src={studentImage} alt="Student"
              layout="responsive"
              width={500}
              height={500}
            />
          
          </StyledBackground>
          </AnimateFadeIn>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SectionTitle;
