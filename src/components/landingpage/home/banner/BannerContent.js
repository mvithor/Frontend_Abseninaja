import React from 'react';
import { Typography, Box, Button, Stack, styled, useMediaQuery } from '@mui/material';
import { IconRocket } from '@tabler/icons';

// third party
import { motion } from 'framer-motion';

const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontWeight: '400',
  fontSize: '16px',
  backgroundColor: '#F48C06',
  '&:hover': {
    backgroundColor: '#d47805', 
  }
}));



const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <Box mt={lgDown ? 8 : 0}>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <Typography variant="h6" display={'flex'} gap={1} mb={2}>
          <Typography color={'secondary'}>
            <IconRocket size={'21'} />
          </Typography>{' '}
          Kick start your project with
        </Typography>

        <Typography
          variant="h2"
          fontWeight={900}
          color={'#F48C06'}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          Selamat Datang  Di Layanan  {' '}
          <Typography component={'span'} variant="none" color={'#2F327D'}>
          Bimbingan Konseling Online
          </Typography>{' '}
         
        </Typography>
      </motion.div>
      <Box pt={4} pb={3}>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.2,
          }}
        >
          <Typography variant="h5" fontWeight={400} color={'#5E6282'}>
          Atasi Tantangan, Capai Tujuan, dan Kuasai Keterampilan
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton variant="contained" color="primary" href="#">
            Selengkapnya
          </StyledButton>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;