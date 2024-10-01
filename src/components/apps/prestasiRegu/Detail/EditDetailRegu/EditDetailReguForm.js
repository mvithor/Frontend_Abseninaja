import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    InputAdornment,
    MenuItem
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SubmitButton from "src/components/apps/buttonGroup/SubmitButton";
import CancelButton from "src/components/apps/buttonGroup/CancelButton";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconAward, IconBuilding, IconCategory, IconClipboardList } from "@tabler/icons";

const EditDetailReguForm = ({id, setSuccess, setError}) => {
  const [students, setStudents] = useState([]);
  const [tingkatanOptions, setTingkatanOptions] = useState([]);
  const [juaraOptions, setJuaraOptions] = useState([]);
  const [namaRegu, setNamaRegu] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        studentId: "",
        tingkatId: "",
        juaraId: "",
        penyelenggara: "",
        keterangan: ""
    });
    const navigate = useNavigate();

    useEffect (() => {
      const fetchData = async () => {
        try {
          const [studentResponse, tingkatanResponse, juaraResponse, reguResponse] = await Promise.all([
            axiosInstance.get('/prestasi-individu/nama-siswa'),
            axiosInstance.get('/options/tingkatan'),
            axiosInstance.get('/options/juara'),
            axiosInstance.get(`/prestasi-regu/${id}`)
          ]);

          const sortedStudents = studentResponse.data.sort((a, b) => a.name.localeCompare(b.name));
          const sortedTingkatan = tingkatanResponse.data.sort((a, b) => a.nama_tingkatan.localeCompare(b.nama_tingkatan));
          const sortedJuara = juaraResponse.data.sort((a, b) => a.nama_juara.localeCompare(b.nama_juara));
          
          setStudents(sortedStudents);
          setTingkatanOptions(sortedTingkatan);
          setJuaraOptions(sortedJuara);
          setNamaRegu(reguResponse.data.nama_regu || "");
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
      fetchData();
    }, [id, setError])

    useEffect(() => {
      if(id) {
        setFormState({
          id: id,
          studentId: id.student_id,
          tingkatId: id.tingkat_id,
          juaraId: id.juara_id,
          penyelenggara: id.penyelenggara,
          keterangan: id.keterangan
        })
      }
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value || ""
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        const response = await axiosInstance.put(`/prestasi-regu-siswa/${id.id}`, {
          id: id,
          student_id: formState.studentId,
          tingkat_id: formState.tingkatId,
          juara_id: formState.juaraId,
          penyelenggara: formState.penyelenggara,
          keterangan: formState.keterangan
        });
        setSuccess(response.data.msg);
        setError("");
        setTimeout(() => navigate(`/dashboard/admin/prestasi/regu/detail/${id}`), 3000)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          console.error("Terjadi kesalahan:", error.response.data);
          setError(error.response.data.msg);
      } else {
          console.error("Terjadi kesalahan:", error.message);
          setError("Terjadi kesalahan saat mengubah prestasi individu");
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
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="namaRegu">
                        Nama Tim
                    </CustomFormLabel>
                    </Box>
                    <CustomTextField
                      id="namaRegu"
                      name="namaRegu"
                      value={namaRegu || ""}
                      variant="outlined"
                      fullWidth
                      disabled
                      sx={{
                         '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) =>
                          `${theme.palette.mode === 'dark'
                           ? 'rgba(255, 255, 255, 0.12) !important'
                          : '#dee3e9 !important'
                          }`,
                       },
                     }}
                    />
            </Grid>
            <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="studentId" sx={{ mt: 0, mb: 1 }}>
                            Nama Siswa
                        </CustomFormLabel>
                    </Box>
                    <Autocomplete
                        multiple
                        id="studentId"
                        options={students}
                        getOptionLabel={(option) => option.name}
                        value={students.filter((student) => formState.studentId.includes(student.id)) || []}
                        onChange={(event, newValue) => {
                            setFormState({ ...formState, studentId: newValue.map(student => student.id) });
                        }}
                        renderInput={(params) => (
                            <CustomTextField {...params} placeholder="Cari / Pilih nama siswa" aria-label="Pilih nama siswa" />
                        )}
                    />
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
                        value={formState.tingkatId || ""}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconCategory/></InputAdornment>}
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
                        value={formState.juaraId || ""}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        startAdornment={<InputAdornment position="start"><IconAward/></InputAdornment>}
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
                        value={formState.penyelenggara || ""}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nama Penyelenggara"
                        startAdornment={<InputAdornment position="start"><IconBuilding/></InputAdornment>}
                        required
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
                        value={formState.keterangan || ""}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Keterangan"
                        startAdornment={<InputAdornment position="start"><IconClipboardList/></InputAdornment>}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={isLoading}/>
                        <CancelButton onClick={handleCancel}>Batal</CancelButton>
                    </Box>
                </Grid>
        </Grid>
      </form>
    );
};

EditDetailReguForm.propTypes = {
  id: PropTypes.string.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,

}

export default EditDetailReguForm;