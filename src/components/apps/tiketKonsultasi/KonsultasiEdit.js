import React, { useEffect, useState } from 'react';
import { Box, InputAdornment, Grid, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import { fetchStatusOptions } from 'src/store/apps/tiketKonsultasi/TiketKonsultasiSlice';

const KonsultasiEditForm = ({
    selectedKonsultasi,
    handleSubmit,
    handleCancel,
}) => {
    const dispatch = useDispatch();
    const statusOptions = useSelector((state) => state.konsultasi.statusOptions);
    const [formState, setFormState] = useState({});

    // Perbarui formState saat selectedKonsultasi berubah
    useEffect(() => {
        if (selectedKonsultasi) {
            setFormState({
                ...selectedKonsultasi,
                wali_nama: selectedKonsultasi.wali_nama, // Menyimpan nama wali siswa
                student_name: selectedKonsultasi.student_name // Menyimpan nama siswa
            });
        }
    }, [selectedKonsultasi]);
    

    // Ambil opsi status jika belum tersedia
    useEffect(() => {
        if(!statusOptions.length) {
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
                        <CustomFormLabel htmlFor="walisiswa_name" sx={{ mt: 0, mb: 1 }}>
                            Nama Wali
                        </CustomFormLabel>
                        <CustomOutlinedInput
                        id="walisiswa_name"
                        name="walisiswa_name"
                        value={formState.wali_nama || ''}
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
                        <CustomFormLabel htmlFor="student_name" sx={{ mt: 0, mb: 1 }}>
                            Nama Anak
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
                        <CustomFormLabel htmlFor="topik" sx={{ mt: 0, mb: 1 }}>
                            Topik
                        </CustomFormLabel>
                        <CustomOutlinedInput
                        id="topik"
                        name="topik"
                        value={formState.topik || ''}
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
                        <CustomFormLabel htmlFor="pelaksana_dituju" sx={{ mt: 0, mb: 1 }}>
                            Pelaksana dituju
                        </CustomFormLabel>
                        <CustomOutlinedInput
                        id="pelaksana_dituju"
                        name="pelaksana_dituju"
                        value={formState.pelaksana_dituju || ''}
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
                            Status Konsultasi
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
                        <CustomFormLabel htmlFor="hasil_konsultasi" sx={{ mt: 0, mb: 1 }}>
                            Hasil Konsultasi
                        </CustomFormLabel>
                        <CustomOutlinedInput
                        id="hasil_konsultasi"
                        name="hasil_konsultasi"
                        value={formState.hasil_konsultasi || ''}
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

export default KonsultasiEditForm;