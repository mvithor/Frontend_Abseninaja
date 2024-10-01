import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';

const CardTitle = () => {
  return (
        <AnimationFadeIn>
          <Stack spacing={2} alignItems="center">
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
              <span style={{ color: '#F48C06' }}>Jangan Ragu</span> 
              <span style={{ color: '#2F327D'}}> Ungkapkan Perasaanmu</span>
            </Typography>

            <Box maxWidth="800px" width="100%">
              <Typography
                variant="h5"
                fontWeight={400}
                textAlign="center"
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
                Hai !, kalau kamu merasa ada yang gak enak atau gak aman disekolah, ceritain ke kita yuk. 
                Suara kamu penting dan kita siap dengerin dengan baik. Jangan ragu kita disini untuk bantu kamu.
              </Typography>
            </Box>
          </Stack>
        </AnimationFadeIn>
  );
};

export default CardTitle;
