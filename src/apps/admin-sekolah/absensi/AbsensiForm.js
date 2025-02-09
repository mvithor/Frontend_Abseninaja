import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import axiosInstance from "src/utils/axiosInstance";

// Enum Status Kehadiran
const enumStatusKehadiran = ["Masuk", "Pulang", "Terlambat", "Alpa", "Izin", "Sakit"];

const AbsensiForm = ({ setSuccess, setError }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    siswa_id: '',
    kelas_id: '',
    nama_kelas: '', 
    tanggal: '',
    jam_masuk: null,
    jam_pulang: null,
    status_kehadiran: '',
    status_kehadiran_id: '',
    keterangan: ''
  });

  // Fetch Data Siswa
  const { data: siswaOptions = [], isError: siswaError } = useQuery({
    queryKey: ["siswaOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/dropdown/siswa');
      return response.data.data;
    }
  });

  // Fetch Data Status Kehadiran
  const { data: statusOptions = [], isError: statusError } = useQuery({
    queryKey: ["statusOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/dropdown/status-kehadiran');
      return response.data.data;
    }
  });

  const mutation = useMutation({
    mutationKey: ["tambahAbsensi"],
    mutationFn: async (newAbsensi) => {
      const response = await axiosInstance.post('/api/v1/absensi/manual', newAbsensi);
      return response.data;
    },
    onSuccess: (data) => {
      setSuccess(data.msg);
      setError(""); // Hapus error jika sukses
      setTimeout(() => navigate("/dashboard/admin-sekolah/absensi-siswa"), 3000);
    },
    onError: (error) => {
      const errorDetails = error.response?.data?.errors || [];
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat menambahkan data absensi";
  
      // Set error message
      if (errorDetails.length > 0) {
        setError(errorDetails.join(", "));
      } else {
        setError(errorMsg);
      }
      setSuccess(""); // Kosongkan success message
    },
    onSettled: () => {
      // Hapus error dan success setelah 3 detik
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    },
  });
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Jika siswa dipilih, otomatis isi kelas_id dan nama_kelas
    if (name === "siswa_id") {
      const selectedSiswa = siswaOptions.find((siswa) => siswa.id === value);
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        kelas_id: selectedSiswa?.kelas_id || '',
        nama_kelas: selectedSiswa?.Kelas.nama_kelas || 'Tidak Diketahui', // Isi nama_kelas dari data siswa
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      tanggal: date
    }));
  };

  const handleTimeChange = (field, value) => {
    if (value) {
      const formattedTime = `${value.getHours().toString().padStart(2, '0')}.${value.getMinutes().toString().padStart(2, '0')}`;
      setFormState((prevState) => ({
        ...prevState,
        [field]: formattedTime,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.tanggal || !formState.status_kehadiran) {
      setError("Tanggal dan status kehadiran harus diisi");
      return;
    }

    mutation.mutate(formState);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (siswaError || statusError) {
    return <div>Error Loading Data...</div>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2} rowSpacing={1}>
          {/* Nama Siswa */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="siswa_id" sx={{ mt: 1.85 }}>
              Nama Siswa
            </CustomFormLabel>
            <Autocomplete
              id="siswa_id"
              options={siswaOptions}
              getOptionLabel={(option) => option.User.name} // Menampilkan nama siswa
              value={siswaOptions.find((siswa) => siswa.id === formState.siswa_id) || null} // Menyesuaikan dengan nilai yang dipilih
              onChange={(event, newValue) => {
                setFormState({
                  ...formState,
                  siswa_id: newValue ? newValue.id : "", 
                  kelas_id: newValue ? newValue.kelas_id : "", 
                  nama_kelas: newValue ? newValue.Kelas.nama_kelas : "Tidak Diketahui"
                });
              }}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  placeholder="Cari / Pilih nama siswa"
                  aria-label="Pilih nama siswa"
                  InputProps={{
                    ...params.InputProps,
                    style: { height: 45 }, 
                  }}
                 
                />
              )}
            />
          </Grid>
          {/* Nama Kelas */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="nama_kelas" sx={{ mt: 1.85 }}>Kelas</CustomFormLabel>
            <CustomTextField
              id="nama_kelas"
              name="nama_kelas"
              value={formState.nama_kelas}
              fullWidth
              disabled
            />
          </Grid>

          {/* Tanggal */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="tanggal" sx={{ mt: 1.85 }}>Tanggal</CustomFormLabel>
            <DatePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  size="medium"
                />
              )}
              value={formState.tanggal}
              onChange={handleDateChange}
              required
            />
          </Grid>

          {/* Jam Masuk */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="jam_masuk" sx={{ mt: 1.85 }}>Jam Masuk</CustomFormLabel>
            <TimePicker
              ampm={false}
              value={formState.jam_masuk ? new Date(`1970-01-01T${formState.jam_masuk.replace('.', ':')}:00`) : null}
              onChange={(value) => handleTimeChange("jam_masuk", value)}
              renderInput={(params) => (
                <CustomTextField {...params} fullWidth size="medium" />
              )}
            />
          </Grid>

          {/* Jam Pulang */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="jam_pulang" sx={{ mt: 1.85 }}>Jam Pulang</CustomFormLabel>
            <TimePicker
              ampm={false}
              value={formState.jam_pulang ? new Date(`1970-01-01T${formState.jam_pulang.replace('.', ':')}:00`) : null}
              onChange={(value) => handleTimeChange("jam_pulang", value)}
              renderInput={(params) => (
                <CustomTextField {...params} fullWidth size="medium" />
              )}
            />
          </Grid>

          {/* Status Kehadiran */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="status_kehadiran" sx={{ mt: 1.85 }}>Status Kehadiran</CustomFormLabel>
            <CustomSelect
              id="status_kehadiran"
              name="status_kehadiran"
              value={formState.status_kehadiran}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="" disabled>
                Pilih Status Kehadiran
              </MenuItem>
              {enumStatusKehadiran.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>

          {/* Status Custom */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="status_kehadiran_id" sx={{ mt: 1.85 }}>Keterangan</CustomFormLabel>
            <CustomSelect
              id="status_kehadiran_id"
              name="status_kehadiran_id"
              value={formState.status_kehadiran_id}
              onChange={handleChange}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Pilih Keterangan
              </MenuItem>
              {statusOptions.map((statusOption) => (
                <MenuItem key={statusOption.id} value={statusOption.id}>
                  {statusOption.nama_status}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>

          {/* Keterangan */}
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="keterangan" sx={{ mt: 1.85 }}>Deskripsi</CustomFormLabel>
            <CustomTextField
              id="keterangan"
              name="keterangan"
              value={formState.keterangan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <SubmitButton isLoading={mutation.isLoading}>Simpan</SubmitButton>
          <CancelButton onClick={handleCancel}>Batal</CancelButton>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default AbsensiForm;
