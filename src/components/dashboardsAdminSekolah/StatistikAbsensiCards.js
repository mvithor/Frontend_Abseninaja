import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";

const fetchStats = async () => {
  const response = await axiosInstance.get("/api/v1/absensi/statistik");
  return response.data.data;
};

const fetchIzinData = async () => {
  const response = await axiosInstance.get("/api/v1/izin/absensi");
  return response.data.data;
};

const StatistikAbsensiCards = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["absensiStats"],
    queryFn: fetchStats,
  });

  const { data: izinData = [], isLoading: isIzinLoading } = useQuery({
    queryKey: ["izinData"],
    queryFn: fetchIzinData,
    enabled: openModal, // Fetch data only when the modal is open
  });

  const data = [
    {
      title: "Siswa Hadir",
      value: stats.Masuk || 0,
    },
    {
      title: "Siswa Alpa",
      value: stats.Alpa || 0,
    },
    {
      title: "Siswa Izin",
      value: stats.Izin || 0,
    },
    {
      title: "Siswa Terlambat",
      value: stats.Terlambat || 0,
    },
  ];

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.action.hover
                    : theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                border:
                  theme.palette.mode === "dark"
                    ? `1px solid ${theme.palette.divider}`
                    : "none",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
                >
                  {isStatsLoading ? "..." : item.value}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                  onClick={item.title === "Siswa Izin" ? handleOpenModal : undefined}
                >
                  Lihat
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal List Izin */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Data Izin Siswa</DialogTitle>
        <DialogContent>
          {isIzinLoading ? (
            <Typography>Loading...</Typography>
          ) : izinData.length > 0 ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6">Nama Siswa</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Kelas</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Tanggal</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Keterangan</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {izinData.map((izin, index) => (
                    <TableRow key={izin.id || `${izin.nama}-${index}`}>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "1rem" }}>{izin.nama}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "1rem" }}>{izin.kelas}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "1rem" }}>{izin.tanggal}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "1rem" }}>{izin.keterangan}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Tidak ada data izin.</Typography>
          )}

          <Button
              variant="outlined"
              size="small"
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                fontSize: "0.75rem",
                mt: 3,
                padding: "4px 8px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
              onClick={handleCloseModal}
            >
              Tutup
            </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StatistikAbsensiCards;
