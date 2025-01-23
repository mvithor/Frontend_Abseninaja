import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import axiosInstance from "src/utils/axiosInstance";

const CloneWaktuForm = ({ setSuccess, setError }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    hariAsalId: "",
    hariTujuanIds: [],
  });

  // Fetch daftar hari
  const { data: hariOptions = [], isError: hariError } = useQuery({
    queryKey: ["hariOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/dropdown/hari");
      return response.data.data;
    },
  });

  // Fetch daftar waktu berdasarkan hari asal
  const { data: waktuList = [], isFetching: isFetchingWaktu } = useQuery({
    queryKey: ["waktuList", formState.hariAsalId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v2/waktu?hari_id=${formState.hariAsalId}`);
      return response.data.data || [];
    },
    enabled: !!formState.hariAsalId, // Fetch otomatis jika `hariAsalId` ada
  });

  const mutation = useMutation({
    mutationFn: async (cloneData) => {
      const response = await axiosInstance.post("/api/v1/clone-waktu", cloneData);
      return response.data;
    },
    onSuccess: (data) => {
      setSuccess(data.msg);
      setError("");
      queryClient.invalidateQueries({ queryKey: ["waktuList", formState.hariAsalId] });
      setTimeout(() => navigate("/dashboard/admin-sekolah/waktu"), 3000);
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat cloning waktu";
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
    },
  });

  const handleHariAsalChange = (event) => {
    const { value } = event.target;
    setFormState({ hariAsalId: value, hariTujuanIds: [] });
  };

  const handleAutoCompleteChange = (event, newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      hariTujuanIds: newValue.map((hari) => hari.id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.hariAsalId || formState.hariTujuanIds.length === 0) {
      setError("Pilih hari asal dan minimal satu hari tujuan.");
      return;
    }
    mutation.mutate(formState);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (hariError) {
    return <Typography variant="body2" color="error">Error loading data...</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4 }}>
      <Grid container spacing={2} rowSpacing={1}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="hariAsalId" sx={{ mt: 1.85 }}>
            Hari Asal
          </CustomFormLabel>
          <CustomSelect
            id="hariAsalId"
            name="hariAsalId"
            value={formState.hariAsalId}
            onChange={handleHariAsalChange}
            fullWidth
            required
            displayEmpty
            inputProps={{ "aria-label": "Pilih Hari Asal" }}
          >
            <MenuItem value="" disabled>
              Pilih Hari
            </MenuItem>
            {hariOptions.map((hariOption) => (
              <MenuItem key={hariOption.id} value={hariOption.id}>
                {hariOption.nama_hari}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="hariTujuan" sx={{ mt: 1.85 }}>
                Hari Tujuan
            </CustomFormLabel>
            <Autocomplete
                multiple
                options={hariOptions.filter((option) => option.id !== parseInt(formState.hariAsalId, 10))}
                getOptionLabel={(option) => option.nama_hari}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={hariOptions.filter((option) => formState.hariTujuanIds.includes(option.id))}
                onChange={handleAutoCompleteChange}
                renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Cari / Pilih Hari Tujuan"
                    variant="outlined"
                    fullWidth
                    sx={{
                    height: '40px', // Ukuran input field agar lebih kecil
                    '& .MuiOutlinedInput-root': {
                        padding: '6px', // Mengurangi padding dalam input
                    },
                    }}
                />
                )}
                PaperComponent={({ children }) => (
                <Paper sx={{ maxHeight: 200 /* Batas tinggi dropdown */ }}>{children}</Paper>
                )}
            />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Daftar Waktu (Hari Asal)
        </Typography>
        {isFetchingWaktu ? (
          <Typography variant="body2">Memuat data...</Typography>
        ) : waktuList.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                      No
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                      Jam Mulai
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                      Jam Selesai
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                      Kategori
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {waktuList.map((waktu, index) => (
                  <TableRow key={waktu.id}>
                    <TableCell>
                      <Typography sx={{ fontSize: "1rem" }}>{index + 1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: "1rem" }}>{waktu.jam_mulai}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: "1rem" }}>{waktu.jam_selesai}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: "1rem" }}>{waktu.kategori}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Tidak ada waktu di hari asal.
          </Typography>
        )}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <SubmitButton isLoading={mutation.isLoading}>Clone</SubmitButton>
        <CancelButton onClick={handleCancel}>Batal</CancelButton>
      </Box>
    </Box>
  );
};

export default CloneWaktuForm;
