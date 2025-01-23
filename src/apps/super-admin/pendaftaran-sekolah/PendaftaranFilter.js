import { Box, Grid, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setVisibilityFilter } from "src/store/apps/pendaftaran-sekolah/PendaftaranSekolahSlice";

const BoxStyled = styled(Box)(() => ({
    padding: '30px',
    transition: '0.1s ease-in',
    cursor: 'pointer',
    color: 'inherit',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  }));

  const PendaftaranFilter = () => {
    const dispatch = useDispatch();
    const pendaftaranSekolah = useSelector((state) => state.pendaftaran.pendaftaranSekolah) || [];
  
    const statusCounts = {
        Submitted: 0,
        Verified: 0,
        Approved: 0,
        Rejected: 0
    };



     // Menghitung status berdasarkan StatusPendaftaran
     if (Array.isArray(pendaftaranSekolah)) {
        pendaftaranSekolah.forEach((p) => {
            const status = p.StatusPendaftaran?.status_pendaftaran; // Akses status dari StatusPendaftaran
            if (statusCounts.hasOwnProperty(status)) {
                statusCounts[status]++;
            }
        });
    }

    return (
        <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={6} lg={2.4}>
                <BoxStyled
                  onClick={() => dispatch(setVisibilityFilter('all'))}
                  sx={{backgroundColor: 'primary.light', color: 'primary.main'}}
                >
                    <Typography variant="h3">{pendaftaranSekolah.length}</Typography>
                    <Typography variant="h6">Pendaftar</Typography>
                </BoxStyled>
            </Grid>
            {Object.keys(statusCounts).map((status) => (
        <Grid item xs={12} sm={6} lg={2.4} key={status}>
          <BoxStyled
            onClick={() => dispatch(setVisibilityFilter(status))}
            sx={{ backgroundColor: getStatusColor(status), color: getStatusColor(status, true) }}
          >
            <Typography variant="h3">{statusCounts[status]}</Typography>
            <Typography variant="h6">{status}</Typography>
          </BoxStyled>
        </Grid>
      ))}

        </Grid>
    );
};

// Fungsi pembantu untuk mendapatkan warna berdasarkan status
const getStatusColor = (status, textColor = false) => {
    const colors = {
        Submitted: 'warning',
        Verified: 'info',
        Approved: 'success',
        Rejected: 'error'
    };
    return textColor ? `${colors[status]}.main` : `${colors[status]}.light`;
}

export default PendaftaranFilter;