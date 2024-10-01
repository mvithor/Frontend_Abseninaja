import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  MenuItem,
  TextField
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "src/components/apps/buttonGroup/SubmitButton";
import CancelButton from "src/components/apps/buttonGroup/CancelButton";
import { IconUser, IconBookmark, IconArrowBadgeDown, IconClipboardText } from "@tabler/icons";

const TambahKonsultasiForm = ({ setSuccess, setError}) => {
    const [bidangOptions, setBidangOptions] = useState([]);
    const [namaSiswa, setNamaSiswa] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        topik: "",
        pelaksanaDituju: "",
        bidangBimbinganId:"",
        statusKonselingId: 1,
        requestDate: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bidangBimbinganResponse = await axiosInstance.get('/bidang-bimbingan');
                const sortedBidangBimbingan = bidangBimbinganResponse.data.sort((a, b) => a.bidang_bimbingan.localeCompare(b.bidang_bimbingan));
                setBidangOptions(sortedBidangBimbingan);

                 // Ambil nama siswa untuk wali siswa yang sedang login
            const namaSiswaResponse = await axiosInstance.get('/konsultasi-wali-siswa/nama-siswa');
            setNamaSiswa(namaSiswaResponse.data.namaSiswa)
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
                }, 2000);
            }
        };
        fetchData();
    }, [setError]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setFormState({
            ...formState,
            requestDate: date
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/konsultasi-wali-siswa/tambah-konsultasi', {
                name: namaSiswa,
                topik: formState.topik,
                pelaksana_dituju: formState.pelaksanaDituju,
                bidang_bimbingan_id: formState.bidangBimbinganId,
                status_konseling_id: formState.statusKonselingId,
                request_date: formState.requestDate
            });
            setSuccess(response.data.msg);
            setError("");
            setFormState({
                topik: "",
                pelaksanaDituju: "",
                bidangBimbinganId: "",
                statusKonselingId: "",
                requestDate: null
            })
            setTimeout(() => navigate('/dashboard/wali-siswa/konsultasi'), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error("Terjadi kesalahan:", error.message);
                setError("Terjadi kesalahan saat menambah data konseling individu");
            }
            setSuccess("");
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setError("");
                setSuccess("");
            }, 3000);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="namaSiswa" sx={{ mt: 0, mb: 1 }}>
                             Nama Anak
                         </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                            id="namaSiswa"
                            name="namaSiswa"
                            value={namaSiswa || ""}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
                            variant="outlined"
                            fullWidth
                            readOnly
                        />
               </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="topik" sx={{ mt: 0, mb: 1 }}>
                             Topik
                         </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                     id="topik"
                     name="topik"
                     value={formState.topik || ''}
                     onChange={handleChange}
                     startAdornment={<InputAdornment position="start"><IconBookmark /></InputAdornment>}
                     variant="outlined"
                     fullWidth
                     required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="pelaksanaDituju" sx={{ mt: 0, mb: 1 }}>
                             Pelaksana yang dituju
                         </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                     id="pelaksanaDituju"
                     name="pelaksanaDituju"
                     value={formState.pelaksanaDituju || ''}
                     onChange={handleChange}
                     startAdornment={<InputAdornment position="start"><IconArrowBadgeDown /></InputAdornment>}
                     variant="outlined"
                     fullWidth
                     required
                    />
                </Grid>
                <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <CustomFormLabel htmlFor="bidangBimbinganId" sx={{ mt: 0, mb: 1 }}>
                                Bidang Bimbingan
                            </CustomFormLabel>
                        </Box>
                        <CustomSelect
                            id="bidangBimbinganId"
                            name="bidangBimbinganId"
                            value={formState.bidangBimbinganId}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            startAdornment={<InputAdornment position="start"><IconClipboardText /></InputAdornment>}
                            required
                        >
                            {bidangOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.bidang_bimbingan}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <CustomFormLabel htmlFor="requestDate" sx={{ mt: 0, mb: 1 }}>
                                Jadwal Konseling
                            </CustomFormLabel>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <DatePicker
                                value={formState.requestDate}
                                onChange={(date) => handleDateChange(date)}
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                            />
                            <TimePicker
                                value={formState.requestDate}
                                onChange={(date) => handleDateChange(date)}
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <SubmitButton isLoading={isLoading} />
                        <CancelButton onClick={handleCancel} />
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>
    );
};
TambahKonsultasiForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default TambahKonsultasiForm;