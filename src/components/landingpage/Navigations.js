import React from 'react';
import { Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';


const StyledButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderRadius: 0,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

const Navigations = () => {
  return (
    <>
      <StyledButton
        component={Link}
        to="/"
      >
        Home
      </StyledButton>
      <StyledButton
        variant="text"
        component={Link}
        to="/tentang-kami"
      >
        Tentang Kami
      </StyledButton>
      <StyledButton
        variant="text"
        component={Link}
        to="/layanan"
      >
        Layanan
      </StyledButton>
      <StyledButton
        variant="text"
        component={Link}
        to="/konselor"
      >
        Konselor
      </StyledButton>
      <StyledButton
        variant="text"
        component={Link}
        to="/literasi"
      >
        Literasi
      </StyledButton>
      <StyledButton
        variant="text"
        component={Link}
        to="/auth/login"
      >
        Login
      </StyledButton>
      <Button
        color="primary"
        target="_blank"
        variant="contained"
        component={Link}
        to="/auth/register"
        sx={{
          backgroundColor: "#F48C06",
          '&:hover': {
            backgroundColor: "#f7a944",
          }
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Navigations;
