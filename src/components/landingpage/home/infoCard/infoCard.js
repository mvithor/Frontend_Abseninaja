import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Container } from '@mui/material';
import AnimationFadeIn from '../animation/Animation'; 
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import HelpIcon from '@mui/icons-material/Help';
import CardTitle from './cardTitle';

const CardInfo = ({ icon, title, description }) => (
  <Card variant="outlined" sx={{ textAlign: 'center', p: 2, borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <Box mb={2}>
        {icon}
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const InfoCard = () => (
  <Container maxWidth="lg" sx={{ mt: 5 }}>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={8}>
      <CardTitle/>
      </Grid>
      
      <Grid container spacing={4} justifyContent="center" mt={5}>
        <Grid item xs={12} sm={6} md={4} mb={8}>
          <AnimationFadeIn>
          <CardInfo
            icon={<PeopleIcon sx={{ fontSize: 40, color: '#1E88E5' }} />}
            title="Teman Yang Siap Mendengar"
            description="Disini kamu bisa cerita apapun dengan nyaman. Kita akan dengar dengan penuh perhatian, dan kita pastikan kamu merasa didukung sepenuh hati."
          />
          </AnimationFadeIn>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <AnimationFadeIn>
          <CardInfo
            icon={<LockIcon sx={{ fontSize: 40, color: '#F48C06' }} />}
            title="Rahasia Terjaga"
            description="Tenang saja, semua ceritamu aman bersama kamu. Privasimu dijaga dengan baik, jadi kamu bisa curhat tanpa khawatir."
          />
            </AnimationFadeIn>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <AnimationFadeIn>
          <CardInfo
            icon={<HelpIcon sx={{ fontSize: 40, color: '#5E35B1' }} />}
            title="Ahli Yang Siap Membantu"
            description="Ada tim ahli yang siap sedia membantu kamu. Mereka akan memberikan dukungan dan solusi untuk setiap masalah yang kamu hadapi."
          />
          </AnimationFadeIn>
        </Grid>
        {/* </CardTitle> */}
      </Grid>
    </Grid>
  </Container>
);

export default InfoCard;
