import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, IconButton, Divider, useTheme, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import axiosInstance from 'src/utils/axiosInstance';

const fetchJumlahSiswa = async () => {
  const response = await axiosInstance.get('/api/v1/statistik/siswa');
  return response.data.data;
};

const fetchJumlahKelas = async () => {
  const response = await axiosInstance.get('/api/v1/statistik/kelas');
  return response.data.data;
};

const fetchJumlahGuru = async () => {
  const response = await axiosInstance.get('/api/v1/statistik/guru');
  return response.data.data;
};

const fetchJumlahStaf = async () => {
  const response = await axiosInstance.get('/api/v1/statistik/staf');
  return response.data.data;
};

const TopCards = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { data: jumlahSiswa, isLoading: isLoadingSiswa, isError: isErrorSiswa, error: errorSiswa } = useQuery({
    queryKey: ['jumlahSiswa'], 
    queryFn: fetchJumlahSiswa, 
  });

  const { data: jumlahKelas, isLoading: isLoadingKelas, isError: isErrorKelas, error: errorKelas } = useQuery({
    queryKey: ['jumlahKelas'], 
    queryFn: fetchJumlahKelas,
  });

  const { data: jumlahGuru, isLoading: isLoadingGuru, isError: isErrorGuru, error: errorGuru } = useQuery({
    queryKey: ['jumlahGuru'], 
    queryFn: fetchJumlahGuru,
  });

  const { data: jumlahStaf, isLoading: isLoadingStaf, isError: isErrorStaf, error: errorStaf } = useQuery({
    queryKey: ['jumlahStaf'], 
    queryFn: fetchJumlahStaf,
  });




  const defaultCards = [
    { href: '/ekstrakurikuler', title: 'Ekstrakurikuler', digits: '15' },
  ];

  const cards = [
    { href: '/jumlah-siswa', title: 'Siswa', digits: jumlahSiswa || '0' },
    { href: '/jumlah-kelas', title: 'Kelas', digits: jumlahKelas || '0' },
    { href: '/jumlah-guru', title: 'Guru', digits: jumlahGuru || '0' },
    { href: '/jumlah-staf', title: 'Staf', digits: jumlahStaf || '0' },
    ...defaultCards,
  ];

  const isLoading = isLoadingSiswa || isLoadingKelas || isLoadingGuru || isLoadingStaf;
  const isError = isErrorSiswa || isErrorKelas || isErrorGuru || isErrorStaf;
  const errorMessage = errorSiswa?.message || errorKelas?.message || errorGuru?.message || errorStaf?.message || 'Gagal memuat data statistik';

  return (
    <Grid container spacing={2} mt={0}>
      {isLoading ? (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      ) : isError ? (
        <Grid item xs={12}>
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        </Grid>
      ) : (
        cards.map((card, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '8px',
                backgroundColor: isDarkMode
                  ? theme.palette.action.hover
                  : theme.palette.background.paper,
                height: '70px',
                boxShadow: theme.shadows[1],
                border: isDarkMode ? `1px solid ${theme.palette.divider}` : 'none',
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
                >
                  {card.digits}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '40px',
                  mx: 2,
                  borderColor: theme.palette.divider,
                }}
              />
              <IconButton
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '8px',
                  color: theme.palette.primary.contrastText,
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
                component={Link}
                to={card.href}
              >
                <Add sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TopCards;
