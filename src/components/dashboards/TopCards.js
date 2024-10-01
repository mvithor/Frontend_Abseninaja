import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from 'src/utils/axiosInstance';
import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from '../../assets/images/svgs/icon-dd-chat.svg';
import icon2 from '../../assets/images/svgs/students.png';
import icon3 from '../../assets/images/svgs/konselor.png';
import icon4 from '../../assets/images/svgs/kelas.png';
import icon5 from '../../assets/images/svgs/teachers.png';
import icon6 from '../../assets/images/svgs/parents.png';
import icon7 from '../../assets/images/svgs/icon-dd-date.svg';
import icon8 from '../../assets/images/svgs/prestasi-individu.png';
import icon9 from '../../assets/images/svgs/prestasi-regu.png';
import icon10 from '../../assets/images/svgs/prestasi-madrasah.png';
import icon11 from '../../assets/images/svgs/icon-favorites.svg';
import icon12 from '../../assets/images/svgs/icon-inbox.svg';

const TopCards = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [konselorCount, setKonselorCount] = useState(0);
  const [kelasCount, setKelasCount] = useState(0);
  const [waliKelasCount, setWaliKelasCount] = useState(0);
  const [waliSiswaCount, setWaliSiswaCount] = useState(0);
  const [prestasiIndividuCount, setPrestasiIndividuCount] = useState(0);
  const [prestasiReguCount, setPrestasiReguCount] = useState(0);
  const [prestasiMadrasahCount, setPrestasiMadrasahCount] = useState(0);
  const [konselingIndividuCount, setKonselingIndividuCount] = useState(0);
  const [konsultasiWaliSiswaCount, setKonsultasiWaliSiswaCount] = useState(0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentResponse, 
               konselorResponse, 
               kelasResponse, 
               waliKelasResponse,
               waliSiswaResponse,
               prestasiIndividuResponse,
               prestasiReguResponse,
               prestasiMadrasahResponse,
               konselingIndividuResponse,
               konsultasiWaliSiswaResponse
              ] = await Promise.all([
          axiosInstance.get('/dashboard/admin/count-students'),
          axiosInstance.get('/dashboard/admin/count-konselor'),
          axiosInstance.get('/dashboard/admin/count-kelas'),
          axiosInstance.get('dashboard/admin/count-wali-kelas'),
          axiosInstance.get('dashboard/admin/count-wali-siswa'),
          axiosInstance.get('dashboard/admin/count-prestasi-individu'),
          axiosInstance.get('dashboard/admin/count-prestasi-regu'),
          axiosInstance.get('dashboard/admin/count-prestasi-madrasah'),
          axiosInstance.get('dashboard/admin/count-konseling-individu'),
          axiosInstance.get('dashboard/admin/count-konsultasi-wali-siswa'),
        ]);

        setStudentCount(studentResponse.data.count);
        setKonselorCount(konselorResponse.data.count);
        setKelasCount(kelasResponse.data.count);
        setWaliKelasCount(waliKelasResponse.data.count);
        setWaliSiswaCount(waliSiswaResponse.data.count);
        setPrestasiIndividuCount(prestasiIndividuResponse.data.count);
        setPrestasiReguCount(prestasiReguResponse.data.count);
        setPrestasiMadrasahCount(prestasiMadrasahResponse.data.count);
        setKonselingIndividuCount(konselingIndividuResponse.data.count);
        setKonsultasiWaliSiswaCount(konsultasiWaliSiswaResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts', error);
      }
    };

    fetchCounts();
  }, []);


  const topcards = [
    {
      href: '/dashboard/admin/siswa',
      icon: icon2,
      title: 'Siswa',
      digits: studentCount,
      bgcolor: 'info',
    },
    {
      href: '/dashboard/admin/wali-siswa',
      icon: icon6,
      title: 'Wali Siswa',
      digits: waliSiswaCount,
      bgcolor: 'warning',
    },
    {
      href: '/dashboard/admin/konselor',
      icon: icon3,
      title: 'Konselor',
      digits: konselorCount,
      bgcolor: 'success',
    },
    {
      href: '/dashboard/admin/kelas',
      icon: icon4,
      title: 'Kelas',
      digits: kelasCount,
      bgcolor: 'error',
    },
    {
      href: '/dashboard/admin/wali-kelas',
      icon: icon5,
      title: 'Wali Kelas',
      digits: waliKelasCount,
      bgcolor: 'info',
    },
    {
      href: '#',
      icon: icon1,
      title: 'Pelanggaran',
      digits: '20',
      bgcolor: 'info',
    },
    {
      href: '/dashboard/admin/prestasi-individu',
      icon: icon8,
      title: 'Prestasi Individu',
      digits: prestasiIndividuCount,
      bgcolor: 'info',
    },
    {
      href: '/dashboard/admin/prestasi-madrasah',
      icon: icon10,
      title: 'Prestasi Madrasah',
      digits: prestasiMadrasahCount,
      bgcolor: 'warning',
    },

    {
      href: '/dashboard/admin/prestasi-regu',
      icon: icon9,
      title: 'Prestasi Regu',
      digits: prestasiReguCount,
      bgcolor: 'success',
    },
    {
      href: '/dashboard/admin/tiket-konseling-individu',
      icon: icon7,
      title: 'Konseling Siswa',
      digits: konselingIndividuCount,
      bgcolor: 'error',
    },
    {
      href: '/dashboard/admin/tiket-konsultasi',
      icon: icon11,
      title: 'Konsultasi Wali',
      digits: konsultasiWaliSiswaCount,
      bgcolor: 'info',
    },
    {
      href: '#',
      icon: icon12,
      title: 'Konsultasi Siswa',
      digits: '20',
      bgcolor: 'info',
    },
  ];

  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Link to={topcard.href}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
