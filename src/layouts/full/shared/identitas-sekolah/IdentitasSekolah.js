import React from 'react';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Ikon untuk avatar

const IdentitasSekolah = () => {
  // Ambil data sekolah dari Redux
  const adminData = useSelector((state) => state.user); // Sesuaikan dengan struktur state Anda

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#fff',
        width: '100%',
        mt: 2,
        borderRadius: 2, // Agar lebih melengkung di tepinya
        boxShadow: 1, // Beri shadow untuk efek timbul
      }}
    >
      {/* Baris pertama: Ikon sekolah, divider, dan jumlah siswa */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        {/* Ikon sekolah */}
        <Avatar
          sx={{
            backgroundColor: '#e6f0ff',
            width: 40,
            height: 40,
          }}
        >
          <AccountBalanceIcon sx={{ color: '#6200EA', fontSize: 30 }} />
        </Avatar>

        {/* Divider vertikal */}
        <Divider orientation="vertical" flexItem sx={{ height: 40, mx: 2 }} />

        {/* Jumlah siswa */}
        <Box>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {adminData?.totalSiswa || '0'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Siswa
          </Typography>
        </Box>
      </Box>

      {/* Baris kedua: Nama sekolah */}
      <Typography variant="h6" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
        {adminData?.schoolName || 'MTs N 2 PESAWARAN'}
      </Typography>

      {/* Baris ketiga: Kontak sekolah (Nomor telepon dan email) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
        {/* Nomor telepon */}
        <Typography variant="body2" color="textSecondary">
          {adminData?.phone || '0721 0804 484654'}
        </Typography>

        {/* Divider kecil */}
        <Divider orientation="vertical" flexItem sx={{ height: 20, mx: 2 }} />

        {/* Email sekolah */}
        <Typography
          variant="body2"
          color="primary"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {adminData?.email || 'mtsn2pesawaran@gmail.com'}
        </Typography>
      </Box>
    </Box>
  );
};

export default IdentitasSekolah;
