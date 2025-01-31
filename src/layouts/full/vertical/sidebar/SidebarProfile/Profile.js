import React from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from 'src/store/Store';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { clearUser } from 'src/store/apps/user/userSlice';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user); // Ambil user dari Redux
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axiosInstance.delete('/api/v1/logout');

      // Hapus semua data dari localStorage dan sessionStorage
      localStorage.clear('accessToken');
      sessionStorage.clear();

      // Hapus data user dari Redux
      dispatch(clearUser());

      // Hapus data yang dipersist di storage
      await persistor.purge();

      // Arahkan ke halaman login
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box
        display={'flex'}
        alignItems="center"
        gap={2}
        sx={{
          p: 2,
          bgcolor: `${'secondary.light'}`,
          borderRadius: '12px', // Tetap mempertahankan bentuk
          boxShadow: 1, // Tambahkan shadow untuk estetika
          width: '100%',
          maxWidth: '400px', // Batasi lebar maksimum box
        }}
      >
        {!hideMenu ? (
          <>
            <Avatar alt={user?.name || 'User'} src={img1} />

            <Box>
              <Typography variant="h6" color="textPrimary">{user?.name || 'Guest'}</Typography>
              <Typography variant="caption" color="textSecondary">{user?.role || 'User'}</Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Logout" placement="top">
                <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
                  <IconPower size="20" />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          ''
        )}
      </Box>
    </Container>
  );
};
