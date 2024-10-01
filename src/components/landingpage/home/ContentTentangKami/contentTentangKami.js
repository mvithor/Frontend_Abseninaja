import React from 'react';
import { Grid, Typography, Container, styled, useMediaQuery } from '@mui/material';
import AnimateFadeIn from '../animation/Animation';
//papper MUI
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

//paper MUI
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 370,
    height: 214,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',

}));
const DemoPaper1 = styled(Paper)(({ theme }) => ({
    width: 500,
    height: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',

}));

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}));

const ContentTentang = () => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    return (
        <StyledContainer maxWidth="lg">

            {/* content 1*/}
            <Grid container spacing={4} alignItems="center" textAlign={'justify'} >
                <Grid item xs={12} md={12} lg={12}>
                      <AnimateFadeIn>
                            <Typography
                                variant={lgUp? "h1" : "h3"}
                                fontWeight={1000}
                                gutterBottom
                                sx={{ color: '#2F327D', mt: 0, textAlign: 'center'}}
                            >
                                Visi dan Misi
                            </Typography>
                        </AnimateFadeIn>
                        <AnimateFadeIn>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-around"
                      sx={{mt:10}}
                      >
                            <DemoPaper1 variant="elevation" sx={{ minWidth: 275, bgcolor: 'primary.about1', textAlign: 'justify', zIndex: 2 }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: '#FFFFFF', textAlign: 'Center' }}
                            >
                                Visi
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={300}
                                sx={{ color: '#FFFFFF' }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit......
                            </Typography>
                                
                            </DemoPaper1>
                           
                           
                            <DemoPaper1 variant="elevation" sx={{ minWidth: 275, bgcolor: 'primary.about1', textAlign: 'justify', zIndex: 2 }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: '#FFFFFF', textAlign: 'center' }}
                            >
                                Misi
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={300}
                                sx={{ color: '#FFFFFF', mt: 2 }}
                            >
                                <ol>
                               <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit......</li>
                               <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit......</li>
                               <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit......</li>
                               <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit......</li>
                               
                                </ol>
                            </Typography>
                            </DemoPaper1>
                                                      
                        </Stack>
                        </AnimateFadeIn>
                        
                    {/* </Box> */}
                </Grid>
            </Grid>
            {/* content 2 */}
            <Grid container spacing={4} alignItems="center" textAlign={'justify'} sx={{mt:8}}>
            <Grid item xs={12} md={12} >
                        <AnimateFadeIn>
                            <Typography
                                variant={lgUp? "h1" : "h3"}
                                fontWeight={1000}
                                gutterBottom
                                sx={{ color: '#2F327D', textAlign:'center', mt: 20}}
                            >
                                Pilar Aspirasi Sekolah
                            </Typography>
                        </AnimateFadeIn>
            </Grid>
            
            
                <Grid item xs={12} md={12} >
                    <AnimateFadeIn>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-evenly" sx={{mt:4}}>
                        
                            <DemoPaper variant="elevation" sx={{ minWidth: 275, bgcolor: 'primary.about', textAlign: 'justify' }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: '#FFFFFF', textAlign: 'left' }}
                            >
                                Kesehatan Mental
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={300}
                                sx={{ color: '#FFFFFF' }}
                            >
                                Memberikan dukungan kesehatan mental holistik bagi, siswa, guru, dan orang tua 
                                melalui informasi, sumber daya, dan layanan konseling
                            </Typography>
                                
                            </DemoPaper>
                            <DemoPaper variant="elevation" sx={{ minWidth: 275, bgcolor: 'primary.about1', textAlign: 'justify' }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: '#FFFFFF', textAlign: 'left' }}
                            >
                                Keterbukaan dan Dukungan
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={300}
                                sx={{ color: '#FFFFFF', mt: 2 }}
                            >
                                Menciptakan lingkungan yang terbuka dan mendukung untuk berbagi, menerima, dan 
                                memberikan dukungan dalam mencari bantuan sem.
                            </Typography>
                            </DemoPaper>
                            <DemoPaper variant="elevation" sx={{ minWidth: 275, bgcolor: 'primary.about2', textAlign: 'justify' }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                gutterBottom
                                sx={{ color: '#FFFFFF', textAlign: 'left' }}
                            >
                                Pendidikan dan Kesadaran
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={300}
                                sx={{ color: '#FFFFFF', mt: 2 }}
                            >
                                Memperkuat pemahaman tentang kesehatan mental, konseling, dan strategi 
                                mengatasi stres serta masalah emosional melalui penyediaan informasi dan edukasi
                            </Typography>
                            </DemoPaper>
                        </Stack>
                    </AnimateFadeIn>
                </Grid>
            </Grid>
        </StyledContainer>




    );
};

export default ContentTentang;