import React, { useState, useEffect } from "react";
import { Grid, Box, MenuItem, InputAdornment } from '@mui/material';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconAward, IconBuilding, IconCategory, IconUser, IconClipboardList } from '@tabler/icons';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrestasiIndividuEditForm = ({ prestasi, setSuccess, setError }) => {
  const [students, setStudents] = useState([]);
  const [tingkatanOptions, setTingkatanOptions] = useState([]);
  const [juaraOptions, setJuaraOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    studentId: '',  // Mengubah dari array ke string kosong untuk sesuai dengan `value` pada Select
    tingkatId: '',
    juaraId: '',
    penyelenggara: '',
    keterangan: ''
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [studentResponse, tingkatanResponse, juaraResponse] = await Promise.all([
          axiosInstance.get('/prestasi-individu/nama-siswa'),
          axiosInstance.get('/options/tingkatan'),
          axiosInstance.get('/options/juara')
        ]);
        const sortedStudents = studentResponse.data.sort((a, b) => a.name.localeCompare(b.name));
        const sortedTingkatan = tingkatanResponse.data.sort((a, b) => a.nama_tingkatan.localeCompare(b.nama_tingkatan));
        const sortedJuara = juaraResponse.data.sort((a, b) => a.nama_juara.localeCompare(b.nama_juara));

        setStudents(sortedStudents);
        setTingkatanOptions(sortedTingkatan);
        setJuaraOptions(sortedJuara);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          console.error("Error fetching data:", error.response.data);
          setError(error.response.data.msg);
        } else {
          console.error("Terjadi kesalahan:", error.message);
          setError("Terjadi kesalahan saat memuat data");
        }
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };
    fetchOptions();
  }, [setError]);

  useEffect(() => {
    if (prestasi) {
      setFormState({
        studentId: prestasi.student_id || '',  // Pastikan nilai default adalah string kosong
        tingkatId: prestasi.tingkat_id || '',
        juaraId: prestasi.juara_id || '',
        penyelenggara: prestasi.penyelenggara || '',
        keterangan: prestasi.keterangan || ''
      });
    }
  }, [prestasi]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");
    
    try {
      const response = await axiosInstance.put(`/prestasi-individu/${prestasi.id}`, {
        student_id: formState.studentId,
        tingkat_id: formState.tingkatId,
        juara_id: formState.juaraId,
        penyelenggara: formState.penyelenggara,
        keterangan: formState.keterangan
      });
      setSuccess(response.data.msg);
      setTimeout(() => {
      setSuccess("");
      navigate('/dashboard/admin/prestasi/individu');
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat mengedit prestasi";
      console.error("Terjadi kesalahan:", errorMsg);
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="studentId" sx={{ mt: 0, mb: 1 }}>
              Nama Siswa
            </CustomFormLabel>
          </Box>
          <CustomSelect
            id="studentId"
            name="studentId"
            value={formState.studentId || ''}  // Menggunakan string kosong jika tidak ada nilai
            onChange={handleChange}
            fullWidth
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
            required
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="tingkatId" sx={{ mt: 0, mb: 1 }}>
              Tingkat
            </CustomFormLabel>
          </Box>
          <CustomSelect
            id="tingkatId"
            name="tingkatId"
            value={formState.tingkatId || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconCategory /></InputAdornment>}
            required
          >
            {tingkatanOptions.map((tingkatan) => (
              <MenuItem key={tingkatan.id} value={tingkatan.id}>
                {tingkatan.nama_tingkatan}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="juaraId" sx={{ mt: 0, mb: 1 }}>
              Juara
            </CustomFormLabel>
          </Box>
          <CustomSelect
            id="juaraId"
            name="juaraId"
            value={formState.juaraId || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconAward /></InputAdornment>}
            required
          >
            {juaraOptions.map((juara) => (
              <MenuItem key={juara.id} value={juara.id}>
                {juara.nama_juara}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="penyelenggara" sx={{ mt: 0, mb: 1 }}>
              Penyelenggara
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            id="penyelenggara"
            name="penyelenggara"
            value={formState.penyelenggara || ''}
            onChange={handleChange}
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconBuilding /></InputAdornment>}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="keterangan" sx={{ mt: 0, mb: 1 }}>
              Keterangan
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            id="keterangan"
            name="keterangan"
            value={formState.keterangan || ''}
            onChange={handleChange}
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconClipboardList /></InputAdornment>}
            fullWidth
          />
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

PrestasiIndividuEditForm.propTypes = {
  prestasi: PropTypes.object.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default PrestasiIndividuEditForm;
