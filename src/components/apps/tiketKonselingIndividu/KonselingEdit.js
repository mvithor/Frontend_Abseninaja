import React, { useEffect, useState } from 'react';
import { Box, InputAdornment, Grid, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconUsers,
  IconUser,
  IconTextRecognition,
  IconClipboardText,
  IconExchange,
  IconCalendarTime,
  IconCalendarPlus,
} from '@tabler/icons';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import SubmitButton from '../buttonGroup/SubmitButton';
import CancelButton from '../buttonGroup/CancelButton';
import { fetchStatusOptions } from 'src/store/apps/tiketKonseling/TiketKonselingIndividuSlice';

const KonselingEditForm = ({
  selectedKonseling,
  handleSubmit,
  handleCancel,
}) => {
  const dispatch = useDispatch();
  const statusOptions = useSelector((state) => state.konseling.statusOptions);
  const [formState, setFormState] = useState({});

  // Update formState when selectedKonseling changes
  useEffect(() => {
    if (selectedKonseling) {
      setFormState({ ...selectedKonseling });
    }
  }, [selectedKonseling]);

  // Fetch status options if not already available
  useEffect(() => {
    if (!statusOptions.length) {
      dispatch(fetchStatusOptions());
    }
  }, [dispatch, statusOptions.length]);

  const handleLocalChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocalSubmit = (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault(); // Mencegah perilaku default form
    }
  
    if (typeof handleSubmit === 'function') {
      handleSubmit(formState); // Panggil handleSubmit dengan formState
    } else {
      console.error('handleSubmit is not defined or not a function');
    }
  };

  if (!statusOptions || statusOptions.length === 0) {
    return <div>Loading status options...</div>;
  }

  return (
    <form onSubmit={handleLocalSubmit}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="student_name" sx={{ mt: 0, mb: 1 }}>
              Nama Siswa
            </CustomFormLabel>
            <CustomOutlinedInput
              id="student_name"
              name="student_name"
              value={formState.student_name || ''}
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconUser />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="jenis_kelamin" sx={{ mt: 0, mb: 1 }}>
              Jenis Kelamin
            </CustomFormLabel>
            <CustomOutlinedInput
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formState.jenis_kelamin || ''}
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconUsers />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="judul_pengaduan" sx={{ mt: 0, mb: 1 }}>
              Judul Pengaduan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="judul_pengaduan"
              name="judul_pengaduan"
              value={formState.judul_pengaduan || ''}
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconTextRecognition />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="deskripsi_permasalahan" sx={{ mt: 0, mb: 1 }}>
              Deskripsi Permasalahan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="deskripsi_permasalahan"
              name="deskripsi_permasalahan"
              value={formState.deskripsi_permasalahan || ''}
              onChange={handleLocalChange}
              fullWidth
              multiline
              rows={4}
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="bidang_bimbingan" sx={{ mt: 0, mb: 1 }}>
              Bidang Bimbingan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="bidang_bimbingan"
              name="bidang_bimbingan"
              value={formState.bidang_bimbingan || ''}
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconClipboardText />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="created_at" sx={{ mt: 0, mb: 1 }}>
              Diajukan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="created_at"
              name="created_at"
              value={
                formState.created_at ? new Date(formState.created_at).toLocaleString() : ''
              }
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconCalendarPlus />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="request_date" sx={{ mt: 0, mb: 1 }}>
              Dijadwalkan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="request_date"
              name="request_date"
              value={
                formState.request_date ? new Date(formState.request_date).toLocaleString() : ''
              }
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconCalendarTime />
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="status_konseling_id" sx={{ mt: 0, mb: 1 }}>
              Status Konseling
            </CustomFormLabel>
            <CustomSelect
              id="status_konseling_id"
              name="status_konseling_id"
              value={formState.status_konseling_id || ''}
              onChange={handleLocalChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconExchange />
                </InputAdornment>
              }
              fullWidth
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.status_konseling}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="arahan" sx={{ mt: 0, mb: 1 }}>
              Arahan
            </CustomFormLabel>
            <CustomOutlinedInput
              id="arahan"
              name="arahan"
              value={formState.arahan || ''}
              onChange={handleLocalChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel htmlFor="tindak_lanjut" sx={{ mt: 0, mb: 1 }}>
              Tindak Lanjut
            </CustomFormLabel>
            <CustomOutlinedInput
              id="tindak_lanjut"
              name="tindak_lanjut"
              value={formState.tindak_lanjut || ''}
              onChange={handleLocalChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton type="submit">Simpan</SubmitButton>
            <CancelButton onClick={handleCancel}>Batal</CancelButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default KonselingEditForm;
