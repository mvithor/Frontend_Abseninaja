import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import icon1 from 'src/assets/images/svgs/parents.png';
import icon2 from 'src/assets/images/svgs/students.png';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import { Avatar, Box } from '@mui/material';

const AuthSocialButtons = ({ title }) => {
  const navigate = useNavigate(); 

  // Fungsi untuk menangani navigasi ke halaman Parents
  const handleNavigateToParents = () => {
    navigate('/auth/register/parents');
  };

  // Fungsi untuk menangani navigasi ke halaman Students
  const handleNavigateToStudents = () => {
    navigate('/auth/register/student'); 
  };

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <CustomSocialButton onClick={handleNavigateToParents}> 
          <Avatar
            src={icon1}
            alt={icon1}
            sx={{
              width: 25,
              height: 25,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
            {title}{' '}
          </Box>{' '}
          Parents
        </CustomSocialButton>
        <CustomSocialButton onClick={handleNavigateToStudents}> 
          <Avatar
            src={icon2}
            alt={icon2}
            sx={{
              width: 25,
              height: 25,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
            {title}{' '}
          </Box>{' '}
          Students
        </CustomSocialButton>
      </Stack>
    </>
  );
};

export default AuthSocialButtons;