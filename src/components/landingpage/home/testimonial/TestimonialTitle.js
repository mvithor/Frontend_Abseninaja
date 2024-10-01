import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';

const TestimonialTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={8}>
        <AnimationFadeIn>
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{
              fontSize: {
                lg: '36px',
                xs: '25px',
              },
              lineHeight: {
                lg: '43px',
                xs: '30px',
              },
            }}
          >
            <span style={{ color : '#F48C06'}}> Apa Kata </span>
            <span style={{ color : '#2F327D'}}> Mereka ? </span>
          </Typography>
          <Box maxWidth = "800px" width="100%" mt={2}>
            <Typography 
            variant='h5'
            fontWeight={400}
            textAlign= "center"
            sx={{
              fontSize: {
                lg: '16px',
                xs: '12px',
              },
              lineHeight: {
                lg: '30px',
                xs: '18px',
              },
            }}
            color="textPrimary"
          >
            Jelajahi cerita inspiratif dari pendapat mereka, 
            dengan  menyoroti pengalaman positif siswa dan orang tua dalam 
            menggunakan layanan konseling sekolah
            </Typography>
          </Box>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default TestimonialTitle;
