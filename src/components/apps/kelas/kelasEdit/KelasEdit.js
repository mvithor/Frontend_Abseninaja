import React, { useState, useEffect } from "react";
import { Grid, Box, InputAdornment, MenuItem } from '@mui/material';
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import axiosInstance from "src/utils/axiosInstance";
import { IconUser, IconSchool } from "@tabler/icons";
import PropTypes from 'prop-types';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";

const KelasEditForm = ({ formState, handleChange, handleSubmit, handleCancel, isLoading }) => {
  const [waliKelasOptions, setWaliKelasOptions] = useState([]);

  useEffect(() => {
    const fetchWaliKelasOptions = async () => {
      try {
        const response = await axiosInstance.get('/wali-kelas');
        const sortedWaliKelasName = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setWaliKelasOptions(sortedWaliKelasName);
      } catch (error) {
        console.error("Terjadi kesalahan:", error.response?.data?.msg || error.message);
      }
    };
    fetchWaliKelasOptions();
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="nama_kelas" sx={{ mt: 0, mb: 1 }}>
              Nama Kelas
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            id="nama_kelas"
            name="nama_kelas"
            value={formState.nama_kelas || ''}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start"><IconSchool /></InputAdornment>}
            fullWidth
            required
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
            name="wali_kelas_id"
            value={formState.wali_kelas_id || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
            required
          >
            {waliKelasOptions.map((waliKelas) => (
              <MenuItem key={waliKelas.id} value={waliKelas.id}>
                {waliKelas.name}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
          <SubmitButton isLoading={isLoading} />
          <CancelButton onClick={handleCancel}>Batal</CancelButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

KelasEditForm.propTypes = {
  formState: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default KelasEditForm;
