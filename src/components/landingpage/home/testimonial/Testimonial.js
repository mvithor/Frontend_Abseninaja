import React from 'react';
import { Avatar, Box, CardContent, Container, Typography, Rating, Stack } from '@mui/material';
import TestimonialTitle from './TestimonialTitle';
import BlankCard from '../../../shared/BlankCard';

import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import AnimationFadeIn from '../animation/Animation';
//Carousel slider 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonial.css';

const SliderData = [
  {
    title: 'Budi Santoso',
    subtitle: 'Membantu saya Mengatasi Stres Belajar',
    avatar: img1,
    subtext:
      'Saya sangat bersyukur menemukan website konseling sekolah ini. Mereka tidak hanya membantu saya mengatasi stres belajar, tetapi juga memberikan tips dan strategi yang berguna. Terima kasih atas segala bantuannya',
  },
  {
    title: 'Dinda Fitriani',
    subtitle: 'Dukungan yang Luar Biasa',
    avatar: img2,
    subtext:
      'Saya ingin mengucapkan terima kasih kepada tim di website konseling sekolah online ini atas dukungan mereka yang luar biasa. Mereka tidak hanya mendengarkan masalah saya, tetapi juga memberikan solusi yang praktis dan membantu saya mengatasi rasa khawatir saya di sekolah.',
  },
  {
    title: 'Rizki Pratama',
    subtitle: 'Solusi untuk Masalah Sekolah',
    avatar: img3,
    subtext:
      'Saya menemukan solusi untuk masalah sekolah saya di website konseling sekolah online ini. Tim konselor sangat responsif dan memberikan dukungan yang dibutuhkan. Saya merasa lebih percaya diri setelah mendapatkan bantuan dari mereka.',
  },
  {
    title: 'Ahmad Faisal',
    subtitle: 'Bantuan yang Profesional',
    avatar: img1,
    subtext:
      'Website konseling sekolah online ini menyediakan bantuan yang sangat profesional. Saya merasa nyaman berbagi masalah saya dan mendapatkan saran yang sangat berharga. Terima kasih kepada tim di balik layanan ini!.',
  },
  {
    title: 'Siti Nurjanah',
    subtitle: 'Mudah digunakan dan Bermanfaat',
    avatar: img2,
    subtext:
      'Saya sangat senang menggunakan website konseling sekolah online ini. Antarmuka yang mudah digunakan membuat saya merasa nyaman dan tenang untuk berbagi masalah. Selain itu, saran yang saya terima juga sangat bermanfaat bagi saya.',
  },
  {
    title: 'Naufal Al Hannan',
    subtitle: 'Pelayanan Konseling yang Ramah',
    avatar: img3,
    subtext:
      'Saya sangat terbantu dengan pelayanan konseling yang ramah dari tim di website konseling sekolah online ini. Mereka sangat peduli dan membantu saya menemukan solusi untuk masalah yang saya hadapi di sekolah. Terima kasih banyak!',
  },
];

const Testimonial = () => {
  const [value, setValue] = React.useState(5);

  const settings = {
    className: 'testimonial-slider',
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box pt={14} pb={11}>
      <Container maxWidth="lg">
        <TestimonialTitle />
        <Box mt={5}>
          <AnimationFadeIn>
            <Slider {...settings}>
              {SliderData.map((slider, index) => (
                <Box key={index} sx={{ p: '15px', width: 'auto' }}>
                  <BlankCard>
                    <CardContent>
                      <Stack direction="row" alignItems="center">
                        <Avatar src={slider.avatar} alt="user" sx={{ width: 40, height: 40 }} />
                        <Box ml={2}>
                          <Typography variant="h6">{slider.title}</Typography>
                          <Typography color="textPrimary" variant="subtitle1">
                            {slider.subtitle}
                          </Typography>
                        </Box>
                        <Box ml="auto">
                          <Rating
                            size="small"
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                      </Stack>
                      <Typography fontSize="15px" color="textPrimary" mt={3}>
                        {slider.subtext}
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </Box>
              ))}
            </Slider>
          </AnimationFadeIn>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonial;
