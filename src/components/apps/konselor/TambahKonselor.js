import React, { useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  InputAdornment
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

const TambahKonselor = ({ setSuccess, setError }) => {
  const [namaKonselor, setNamaKonselor] = useState("");
  const [emailKonselor, setEmailKonselor] = useState("");
  const [bidangKonselor, setBidangKonselor] = useState("");
  const [noTeleponKonselor, setnoTeleponKonselor] = useState("");
  const [alamatKonselor, setAlamatKonselor] = useState("");
  const [statusKonselor, setStatusKonselor] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNamaKonselor(event.target.value);
    setEmailKonselor(event.target.value);
    setBidangKonselor(event.target.value);
    setnoTeleponKonselor(event.target.value);
    setAlamatKonselor(event.target.value);
    setStatusKonselor(event.target.value);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const normalizedNamaKonselor = namaKonselor.toLowerCase(); 
      const normalizedEmailKonselor = emailKonselor.toLowerCase(); 
      const normalizedBidangKonselor = bidangKonselor.toLowerCase();
      const normalizednoTeleponKonselor = noTeleponKonselor.toLowerCase();
      const normalizedAlamatKonselor = alamatKonselor.toLowerCase();
      const normalizedStatusKonselor = statusKonselor.toLowerCase();
      await axiosInstance.post("/konselor/tambah-konselor", {
        nama: normalizedNamaKonselor,
        email: normalizedEmailKonselor,
        bidang: normalizedBidangKonselor,
        nomor_telepon: normalizednoTeleponKonselor,
        alamat: normalizedAlamatKonselor,
        status_aktif:normalizedStatusKonselor
      });
      setSuccess("Konselor berhasil ditambahkan!");
      setError(""); 
      setNamaKonselor(""); 
      setTimeout(() => navigate("/dashboard/admin/konselor"), 2000);
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.msg
        ? error.response.data.msg
        : "Terjadi kesalahan saat menambah konselor";
      setError(errorMessage);
      setSuccess(""); 
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="namaKonselor" sx={{ mt: 0, mb: 1 }}>
              Nama
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="namaKonselor"
            name="namaKonselor"
            value={namaKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="emailKonselor" sx={{ mt: 0, mb: 1 }}>
              Email
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="emailKonselor"
            name="emailKonselor"
            value={emailKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bidangKonselor" sx={{ mt: 0, mb: 1 }}>
              Bidang 
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="bidangKonselor"
            name="bidangKonselor"
            value={bidangKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="noTeleponKonselor" sx={{ mt: 0, mb: 1 }}>
              Nomor Telepon
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="noTeleponKonselor"
            name="noTeleponKonselor"
            value={noTeleponKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="alamatKonselor" sx={{ mt: 0, mb: 1 }}>
              Alamat
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="alamatKonselor"
            name="alamatKonselor"
            value={alamatKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="statusKonselor" sx={{ mt: 0, mb: 1 }}>
              Status Aktif
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            id="statusKonselor"
            name="statusKonselor"
            value={statusKonselor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
            <Button
              sx={{
                mr: 2,
                backgroundColor: "#F48C06",
                '&:hover': { backgroundColor: "#f7a944" }
              }}
              variant="contained"
              type="submit"
            >
              Simpan
            </Button>
            <Button
              sx={{
                backgroundColor: "#2F327D",
                '&:hover': { backgroundColor: "#63659e" }
              }}
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleCancel}
            >
              Batal
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default TambahKonselor;
