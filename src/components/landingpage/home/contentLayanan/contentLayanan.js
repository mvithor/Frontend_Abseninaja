import React from 'react';
import { Grid, Typography, Box, Container, styled, Button, useMediaQuery} from '@mui/material';
import AnimateFadeIn from '../animation/Animation';


import studentImage from '../../../../assets/images/landingpage/services3.svg';
import studentImage1 from '../../../../assets/images/landingpage/services4.svg';
import studentImage2 from '../../../../assets/images/landingpage/services5.svg';
import studentImage3 from '../../../../assets/images/landingpage/services6.svg';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));
const StyledButton = styled(Button)(() => ({
  padding: '5px 10px',
  fontWeight: '400',
  marginLeft: '10px',
  fontSize: '16px',
  backgroundColor: '#F48C06',
  '&:hover': {
    backgroundColor: '#d47805', 
  }
}));
//#2F327D
// bg1
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
// bg2
const StyledBackground1 = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: `url(${studentImage1}) no-repeat center center`,
    backgroundSize: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
}));
// bg3
const StyledBackground2 = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: `url(${studentImage2}) no-repeat center center`,
    backgroundSize: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
}));
// bg4
const StyledBackground3 = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: `url(${studentImage3}) no-repeat center center`,
    backgroundSize: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
}));

const ContentLayanan = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    
    <StyledContainer maxWidth="lg">

      {/* content 1*/}
      <Grid container spacing={4} alignItems="center" textAlign={'justify'}>
        <Grid item xs={12} md={6}>
          <Box>
            <AnimateFadeIn>
              <Typography
                variant={lgUp? "h2" : "h3"}
                fontWeight={700}
                gutterBottom
                sx={{ color: '#2F327D' }}
              >
                Pusat Informasi Konseling Remaja
              </Typography>
            </AnimateFadeIn>
            <AnimateFadeIn>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ color: 'textPrimary', mt: 2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nisl sem. Suspendisse efficitur,
                libero sed facilisis laoreet, lacus nisl dictum mauris, ut ultrices enim enim dapibus sem.
                Etiam fringilla ante ac porttitor ultricies. Phasellus nisl ligula, maximus quis mi at,
                iaculis congue sem. Aenean quis dictum diam. Nam sed odio a lorem imperdiet vehicula nec ac mauris.
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas vel lectus at congue.
                Vestibulum vel nisi sollicitudin, venenatis erat ut, tempor purus. Donec sit amet nulla nisi.
                
                  <StyledButton variant="contained" color="primary" href="/auth/login">
                    Mulai
                  </StyledButton>
                
              </Typography>
            </AnimateFadeIn>
          </Box>
        </Grid>
        { lgUp? (
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
        ): null}
      </Grid>
      {/* content 2 */}
      <Grid container spacing={4} alignItems="center" textAlign={'justify'}>
      { lgUp? (
        <Grid item xs={12} md={6}>
          <AnimateFadeIn>
            <StyledBackground1>

              <img src={studentImage1} alt="Student"
                layout="responsive"
                width={500}
                height={500}
              />

            </StyledBackground1>
          </AnimateFadeIn>
        </Grid>
      ) : null}
        <Grid item xs={12} md={6}>
          <Box>
            <AnimateFadeIn>
              <Typography
                variant={lgUp? "h2" : "h3"}
                fontWeight={700}
                gutterBottom
                sx={{ color: '#2F327D' }}
                textAlign='left'
              >
                <span style={{ color: '#F48C06' }}>Pengembangan Keterampilan Ektrakulikuler</span>
              </Typography>
            </AnimateFadeIn>
            <AnimateFadeIn>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ color: 'textPrimary', mt: 2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nisl sem. Suspendisse efficitur,
                libero sed facilisis laoreet, lacus nisl dictum mauris, ut ultrices enim enim dapibus sem.
                Etiam fringilla ante ac porttitor ultricies. Phasellus nisl ligula, maximus quis mi at,
                iaculis congue sem. Aenean quis dictum diam. Nam sed odio a lorem imperdiet vehicula nec ac mauris.
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas vel lectus at congue.
                Vestibulum vel nisi sollicitudin, venenatis erat ut, tempor purus. Donec sit amet nulla nisi.
                <StyledButton variant="contained" color="primary" href="/auth/login">
                    Mulai
                  </StyledButton>
              </Typography>
            </AnimateFadeIn>
          </Box>
        </Grid>

      </Grid>
      {/* content 3 */}
      <Grid container spacing={4} alignItems="center" textAlign={'justify'}>
        <Grid item xs={12} md={6}>
          <Box>
            <AnimateFadeIn>
              <Typography
                variant={lgUp? "h2" : "h3"}
                fontWeight={700}
                gutterBottom
                sx={{ color: '#2F327D' }}
              >
                Test Minat dan Bakat Remaja
              </Typography>
            </AnimateFadeIn>
            <AnimateFadeIn>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ color: 'textPrimary', mt: 2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nisl sem. Suspendisse efficitur,
                libero sed facilisis laoreet, lacus nisl dictum mauris, ut ultrices enim enim dapibus sem.
                Etiam fringilla ante ac porttitor ultricies. Phasellus nisl ligula, maximus quis mi at,
                iaculis congue sem. Aenean quis dictum diam. Nam sed odio a lorem imperdiet vehicula nec ac mauris.
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas vel lectus at congue.
                Vestibulum vel nisi sollicitudin, venenatis erat ut, tempor purus. Donec sit amet nulla nisi.
                <StyledButton variant="contained" color="primary" href="/auth/login">
                    Mulai
                  </StyledButton>
              </Typography>
            </AnimateFadeIn>
          </Box>
        </Grid>
        { lgUp? (
        <Grid item xs={12} md={6}>
          <AnimateFadeIn>
            <StyledBackground2>

              <img src={studentImage2} alt="Student"
                layout="responsive"
                width={500}
                height={500}
              />

            </StyledBackground2>
          </AnimateFadeIn>
        </Grid>
        ) : null}
      </Grid>
      {/* content 4 */}
      <Grid container spacing={4} alignItems="center" textAlign={'justify'}>
      { lgUp? (
        <Grid item xs={12} md={6}>
          <AnimateFadeIn>
            <StyledBackground3>

              <img src={studentImage3} alt="Student"
                layout="responsive"
                width={500}
                height={500}
              />

            </StyledBackground3>
          </AnimateFadeIn>
        </Grid>
      ) : null }
        <Grid item xs={12} md={6}>
          <Box>
            <AnimateFadeIn>
              <Typography
                variant={lgUp? "h2" : "h3"}
                fontWeight={700}
                gutterBottom
                sx={{ color: '#2F327D' }}
              >
                <span style={{ color: '#F48C06' }}>Test Kepribadian Remaja</span>
              </Typography>
            </AnimateFadeIn>
            <AnimateFadeIn>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ color: 'textPrimary', mt: 2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nisl sem. Suspendisse efficitur,
                libero sed facilisis laoreet, lacus nisl dictum mauris, ut ultrices enim enim dapibus sem.
                Etiam fringilla ante ac porttitor ultricies. Phasellus nisl ligula, maximus quis mi at,
                iaculis congue sem. Aenean quis dictum diam. Nam sed odio a lorem imperdiet vehicula nec ac mauris.
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas vel lectus at congue.
                Vestibulum vel nisi sollicitudin, venenatis erat ut, tempor purus. Donec sit amet nulla nisi.
                <StyledButton variant="contained" color="primary" href="/auth/login">
                    Mulai
                  </StyledButton>
              </Typography>
            </AnimateFadeIn>
          </Box>
        </Grid>

      </Grid>
    </StyledContainer>
  );
};

export default ContentLayanan;