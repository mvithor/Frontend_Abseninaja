import React, { useState, useEffect } from 'react';
import axiosInstance from "src/utils/axiosInstance";
import { Grid, Box, Button, MenuItem, InputAdornment } from '@mui/material';
import { IconUser, IconGenderAgender } from '@tabler/icons';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";

import FormInput from './FormInput';

const PelanggaranEditForm = ({ pelanggaran, handleChange, handleSubmit, handleCancel }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [genderOptions, setGenderOptions] = useState([]);

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

  if (!pelanggaran) {
    return null;
  }

  const initialPelanggaran = {
    nama_siswa: '',
    jenis_kelamin: '',
    waktu: '',
    peristiwa: '',
    tempat: '',
    informan: '',
    bidang_bimbingan: ''
  };

  const currentPelanggaran = { ...initialPelanggaran, ...pelanggaran };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !currentPelanggaran.nama_siswa || 
      !currentPelanggaran.jenis_kelamin || 
      !currentPelanggaran.waktu || 
      !currentPelanggaran.peristiwa || 
      !currentPelanggaran.tempat || 
      !currentPelanggaran.informan || 
      !currentPelanggaran.bidang_bimbingan
    ) {
      setErrorMessage("Semua form harus diisi.");
      return;
    }

    setErrorMessage('');
    handleSubmit(e);
  };

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="nama_siswa" sx={{ mt: 0, mb: 1 }}>
              Nama Siswa
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
            id="nama_siswa"
            name="nama_siswa"
            value={currentPelanggaran.nama_siswa || ''}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="jenis_kelamin" sx={{ mt: 2, mb: 1 }}>
              Jenis Kelamin
            </CustomFormLabel>
          </Box>
          <CustomSelect
            startAdornment={<InputAdornment position="start"><IconGenderAgender /></InputAdornment>}
            id="jenis_kelamin"
            name="jenis_kelamin"
            value={currentPelanggaran.jenis_kelamin || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            {genderOptions.map((genderOption) => (
              <MenuItem key={genderOption.id} value={genderOption.jenis_kelamin}>
                {genderOption.jenis_kelamin}
              </MenuItem>
            ))}
          </CustomSelect>
          <FormInput
            label="Waktu Kejadian"
            id="waktu"
            name="waktu"
            value={currentPelanggaran.waktu || ''}
            onChange={handleChange}
            icon={<IconUser size="20" />}
            required
          />
          <FormInput
            label="Peristiwa"
            id="peristiwa"
            name="peristiwa"
            value={currentPelanggaran.peristiwa || ''}
            onChange={handleChange}
            icon={<IconUser size="20" />}
            required
          />
          <FormInput
            label="Tempat"
            id="tempat"
            name="tempat"
            value={currentPelanggaran.tempat || ''}
            onChange={handleChange}
            icon={<IconUser size="20" />}
            required
          />
          <FormInput
            label="Informan"
            id="informan"
            name="informan"
            value={currentPelanggaran.informan || ''}
            onChange={handleChange}
            icon={<IconUser size="20" />}
            required
          />
          <FormInput
            label="Bidang Bimbingan"
            id="bidang_bimbingan"
            name="bidang_bimbingan"
            value={currentPelanggaran.bidang_bimbingan || ''}
            onChange={handleChange}
            icon={<IconUser size="20" />}
            required
          />
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
                Edit
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
          {errorMessage && (
            <Grid item xs={12}>
              <Box sx={{ color: 'red', mt: 2 }}>
                {errorMessage}
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default PelanggaranEditForm;
