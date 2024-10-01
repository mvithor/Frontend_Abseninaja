import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from 'src/store/Store';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { clearUser } from 'src/store/apps/user/userSlice';

export const Profile =  () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Hapus semua data dari localStorage dan sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Hapus data user dari Redux
    dispatch(clearUser());

      // Hapus data yang dipersist di storage
      await persistor.purge();

    // Arahkan ke halaman login
    navigate('/auth/login');
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary">Mathew</Typography>
            <Typography variant="caption" color="textSecondary">Designer</Typography>
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
  );
};
