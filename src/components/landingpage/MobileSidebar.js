import React from 'react';
import { Button, Box, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from "src/layouts/full/shared/logo/Logo"


const StyledButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 0,
    justifyContent: 'left',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  }));

const MobileSidebar = () => {
    return (
        <>
            <Box px={3}>
                <Logo />
            </Box>
            <Box p={3}>

                <Stack direction="column" spacing={2} >
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
                            backgroundColor: "#fa9e28",
                        }
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Box>
        </>


    );
};

export default MobileSidebar;
