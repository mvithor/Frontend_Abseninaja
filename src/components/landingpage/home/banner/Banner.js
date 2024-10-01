import React from 'react';
import { Grid, Box, Container, useMediaQuery, styled} from '@mui/material';
import BannerContent from './BannerContent';
import bannerbgImg1 from 'src/assets/images/landingpage/Banner1.svg';
import bannerbgImg2 from 'src/assets/images/landingpage/Banner2.svg';
import bannerbgImg3 from 'src/assets/images/landingpage/Banner3.svg';
import bannerbgImg4 from 'src/assets/images/landingpage/Banner4.svg';
import bannerbgImg5 from 'src/assets/images/landingpage/Banner5.svg';
import bannerbg from 'src/assets/images/landingpage/bgBanner.svg';


const Banner = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const BackgroundBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${bannerbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  }));
  // Siswi
  const SliderBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '@keyframes slideup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(-8%)',
      },
    },
    animation: 'slideup 3s ease-in-out infinite alternate',
  }));
  // 1000K
  const SliderBox2 = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '20%',
    right: '-2%',
    width: '40%',
    height: '40%',
    '@keyframes slideDown': {
      '0%': {
        transform: 'translateY(-10%)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    },
    animation: 'slideDown 3s ease-in-out infinite alternate',
  }));

  //Online dan Offline
  const SliderBox3 = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '40%',
    right: '-2%',
    width: '40%',
    height: '40%',
    overflow: 'hidden',
    // backgroundSize: 'cover',
    '@keyframes slideup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(-10%)',
      },
    },
    animation: 'slideup 3s ease-in-out infinite alternate',
  }));
  // User Experience
  const SliderBox4 = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    right: '60%',
    width: '40%',
    height: '50%',
    overflow: 'hidden',
    '@keyframes slideup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(-10%)',
      },
    },
    animation: 'slideup 3s ease-in-out infinite alternate',
  }));
  // Safe Privacy
  const SliderBox5 = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '30%',
    right: '60%',
    width: '40%',
    height: '40%',
    // backgroundSize: 'cover',
    '@keyframes slideDown': {
      '0%': {
        transform: 'translateY(-5%)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    },
    animation: 'slideDown 3s ease-in-out infinite alternate',
  }));


  return (
    
    <Box mb={10} sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6} md={8}>
            <BannerContent />
          </Grid>
          {lgUp ? (
            <Grid item xs={12} lg={6} md={4}>
              <Box
                p={3.2}
                sx={{
                  backgroundColor: ('#ffffff'),
                  position: 'relative',
                  height: 'calc(100vh - 100px)',
                  maxHeight: '790px',
                  overflow: 'hidden',
                }}
              >
                
                <BackgroundBox />
                <img src={bannerbg} alt="banner" style={{ 
                  position: 'absolute',
                   top: 0, 
                   left: 0, 
                   width: '100%', 
                   height: '100%' 
                   }} />
                
                
               
                <SliderBox>
                  <img src={bannerbgImg1} alt="banner" style={{ width: '100%', height: '100%' }} />
                </SliderBox>
                <SliderBox2>
                  <img src={bannerbgImg2} alt="banner" style={{ width: '100%', height: '100%' }} />
                </SliderBox2>
                <SliderBox3>
                  <img src={bannerbgImg3} alt="banner" style={{ width: '100%', height: '100%' }} />
                </SliderBox3>
                <SliderBox4>
                  <img src={bannerbgImg4} alt="banner" style={{ width: '100%', height: '100%' }} />
                </SliderBox4>
                <SliderBox5>
                  <img src={bannerbgImg5} alt="banner" style={{ width: '100%', height: '100%' }} />
                </SliderBox5>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
