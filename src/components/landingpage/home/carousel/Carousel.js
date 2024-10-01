import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix'
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      'https://assets.telegraphindia.com/telegraph/2022/Apr/1650925361_1596669098_stud.gif?auto=format&fit=crop&w=1200&h=700&q=60',
  },
  {
    imgPath:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVk-YCb48r8mlAJ4ujJGAC8L8pV6VHggaw7A&s?auto=format&fit=crop&w=1200&h=700&q=60',
  },
  {
    imgPath:
      'https://timess3spore.s3.amazonaws.com/ndata/et_images/desktop_image_webp/e1074390c99acab0457aa4b5a0fe21a2thumbnail_dummy-school.webp?auto=format&fit=crop&w=1200&h=700',
  },
  {
    imgPath:
      'https://media.assettype.com/freepressjournal/2023-03/ed1abca1-470e-4262-b36f-7ed2712d732c/Untitled_design___2023_03_17T154636_336.jpg?auto=format&fit=crop&w=1200&h=700&q=60',
  },
];

export default function ImgCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          // height: 800,
          bgcolor: 'background.default',
          // position: 'center',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 800,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // position: 'center',
                  // backgroundSize: 'cover',
                  // backgroundPosition: 'center',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}


