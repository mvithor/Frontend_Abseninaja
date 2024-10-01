import React, { useState, useEffect } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';

// import DateInput from './DateInput';
import {
  Grid,
  Box,
  Button,
  InputAdornment,
  MenuItem
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import {
  IconSchool,
  IconGenderAgender,
  IconCalendarTime,
  IconTimelineEvent,
  IconMapPins,
  IconFileInfo,
  IconGridDots
} from '@tabler/icons';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

const TambahPelanggaranForm = ({ setSuccess, setError }) => {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [genderOptions, setGenderOptions] = useState([]);
  const [waktu, setWaktu] = useState("");
  const [peristiwa, setPeristiwa] = useState("");
  const [tempat, setTempat] = useState("");
  const [informan, setInforman] = useState("");
  const [bidangBimbingan, setBidangBimbingan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenderOptions = async () => {
      try {
        const response = await axiosInstance.get('/users/jenis-kelamin');
        setGenderOptions(response.data);
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    };


    fetchGenderOptions();

  }, []);
  const handleChange = (event) => {
    setNamaSiswa(event.target.value);
  };
  const handleChange1 = (event) => {
    setJenisKelamin(event.target.value);
  };
  const handleChange2 = (event) => {
    setWaktu(event.target.value);
  };
  const handleChange3 = (event) => {
    setPeristiwa(event.target.value);
  };
  const handleChange4 = (event) => {
    setTempat(event.target.value);
  };
  const handleChange5 = (event) => {
    setInforman(event.target.value);
  };
  const handleChange6 = (event) => {
    setBidangBimbingan(event.target.value);
  };
  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const normalizedNamaKelas = pelanggaran.toLowerCase(); 
      await axiosInstance.post("/admin/api/pelanggaran", {
        // nama_kelas: normalizedNamaKelas 
        namaSiswa: namaSiswa,
        jenisKelamin: jenisKelamin,
        waktu: waktu,
        peristiwa: peristiwa,
        tempat: tempat,
        informan: informan,
        bidangBimbingan: bidangBimbingan
      });
      setSuccess("Pelanggaran berhasil ditambahkan!");
      setError("");

      setNamaSiswa("");
      setJenisKelamin("");
      setWaktu("");
      setPeristiwa("");
      setTempat("");
      setInforman("");
      setBidangBimbingan("");
      setTimeout(() => navigate("/dashboard/admin/pelanggaran"), 2000);
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.msg
        ? error.response.data.msg
        : "Terjadi kesalahan saat menambah pelanggaran";
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="namaSiswa" sx={{ mt: 0, mb: 1 }}>
              Nama Siswa
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconSchool /></InputAdornment>}
            id="namaSiswa"
            name="namaSiswa"
            value={namaSiswa}
            onChange={handleChange}
            fullWidth
          />
          {/* <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="jenisKelamin" sx={{ mt: 2, mb: 1 }}>
              Jenis Kelamin
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconGenderAgender /></InputAdornment>}
            id="jenisKelamin"
            name="jenisKelamin"
            value={jenisKelamin}
            onChange={handleChange1}
            fullWidth
          /> */}
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="jenisKelamin" sx={{ mt: 2, mb: 1 }}>
              Jenis Kelamin
            </CustomFormLabel>
          </Box>
          <CustomSelect
            startAdornment={<InputAdornment position="start"><IconGenderAgender /></InputAdornment>}
            id="jenisKelamin"
            name="jenisKelamin"
            value={jenisKelamin}
            onChange={handleChange1}
            fullWidth
            variant="outlined"
          >
            {genderOptions.map((genderOption) => (
              <MenuItem key={genderOption.id} value={genderOption.jenis_kelamin}>
                {genderOption.jenis_kelamin}
              </MenuItem>
            ))}
          </CustomSelect>
          {/* ----------- */}
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="waktu" sx={{ mt: 2, mb: 1 }}>
              Waktu
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconCalendarTime /></InputAdornment>}
            id="waktu"
            name="waktu"
            value={waktu}
            onChange={handleChange2}
            fullWidth
            disable
          />
          {/* DatePicker */}
          <CustomFormLabel htmlFor="waktu">Waktu Kejadian</CustomFormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  size="medium"
                />
              )}
              placeholder="Tanggal Lahir"
              value={waktu}
              onChange={(newValue) => setWaktu(newValue)}
              required
            />
          </LocalizationProvider>

          {/* ----------- */}
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="peristiwa" sx={{ mt: 2, mb: 1 }}>
              Peristiwa
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconTimelineEvent /></InputAdornment>}
            id="peristiwa"
            name="peristiwa"
            value={peristiwa}
            onChange={handleChange3}
            fullWidth
          />
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="tempat" sx={{ mt: 2, mb: 1 }}>
              Tempat
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconMapPins /></InputAdornment>}
            id="tempat"
            name="tempat"
            value={tempat}
            onChange={handleChange4}
            fullWidth
          />
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="informan" sx={{ mt: 2, mb: 1 }}>
              Informan
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconFileInfo /></InputAdornment>}
            id="informan"
            name="informan"
            value={informan}
            onChange={handleChange5}
            fullWidth
          />
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bidangBimbingan" sx={{ mt: 0, mb: 1 }}>
              Bidang Bimbingan
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconGridDots /></InputAdornment>}
            id="bidangBimbingan"
            name="bidangBimbingan"
            value={bidangBimbingan}
            onChange={handleChange6}
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

export default TambahPelanggaranForm;
