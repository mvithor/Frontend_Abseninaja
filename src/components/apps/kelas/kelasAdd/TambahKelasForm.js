import React, { useState, useEffect } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  MenuItem
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconSchool } from '@tabler/icons'; 
import SubmitButton from "../../buttonGroup/SubmitButton";

const TambahKelasForm = ({ setSuccess, setError }) => {
  const [namaKelas, setNamaKelas] = useState("");
  const [waliKelasId, setWaliKelasId] = useState(""); // State for selected wali kelas ID
  const [waliKelasOptions, setWaliKelasOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get('/wali-kelas');
        setWaliKelasOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "namaKelas") {
      setNamaKelas(value);
    } else if (name === "waliKelasId") {
      setWaliKelasId(value);
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/kelas/tambah-kelas', {
        nama_kelas: namaKelas,
        wali_kelas_id: waliKelasId 
      });
      setSuccess(response.data.msg);
      setError(""); 
      setTimeout(() => navigate('/dashboard/admin/kelas'), 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.error("Terjadi kesalahan:", error.response.data);
        setError(error.response.data.msg);
      } else {
        console.error("Terjadi kesalahan:", error.message);
        setError("Terjadi kesalahan saat menambahkan kelas");
      }
      setSuccess("");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="namaKelas" sx={{ mt: 0, mb: 1 }}>
              Nama Kelas
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconSchool /></InputAdornment>}
            id="namaKelas"
            name="namaKelas"
            value={namaKelas}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="waliKelasId" sx={{ mt: 0, mb: 1 }}>
              Wali Kelas
            </CustomFormLabel>
          </Box>
          <CustomSelect
            id="waliKelasId"
            name="waliKelasId"
            value={waliKelasId}
            onChange={handleChange}
            fullWidth
            required
          >
            {waliKelasOptions.map((wali) => (
              <MenuItem key={wali.id} value={wali.id}>
                {wali.name}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12}>
          <SubmitButton isLoading={isLoading}/>
          <CancelButton onClick={handleCancel}>Batal</CancelButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TambahKelasForm;
