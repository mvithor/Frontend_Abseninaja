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
import { IconTextRecognition, IconClipboardText } from "@tabler/icons";

const TambahKonselingIndividuForm = ({ setSuccess, setError }) => {
    const [bidangOptions, setBidangOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        judulPengaduan: "",
        deskripsiPermasalahan: "",
        bidangBimbinganId: "",
        statusKonselingId: 1,
        requestDate: null, // Use null for uninitialized date
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bidangBimbinganResponse = await axiosInstance.get('/bidang-bimbingan');
                const sortedBidangBimbingan = bidangBimbinganResponse.data.sort((a, b) => a.bidang_bimbingan.localeCompare(b.bidang_bimbingan));
                setBidangOptions(sortedBidangBimbingan);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/konseling-individu/tambah-konseling-individu', {
               judul_pengaduan: formState.judulPengaduan,
               deskripsi_permasalahan: formState.deskripsiPermasalahan,
               bidang_bimbingan_id: formState.bidangBimbinganId,
               status_konseling_id: formState.statusKonselingId,
               request_date: formState.requestDate ? formState.requestDate.toISOString() : ""
            });
            setSuccess(response.data.msg);
            setError("")
            setFormState({
                judulPengaduan: "",
                deskripsiPermasalahan: "",
                bidangBimbinganId: "",
                statusKonselingId: "",
                requestDate: null
            })
            setTimeout(() => navigate('/dashboard/siswa/konseling-individu'), 3000);
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
                            <CustomFormLabel htmlFor="judulPengaduan" sx={{ mt: 0, mb: 1 }}>
                                Judul 
                            </CustomFormLabel>
                        </Box>
                        <CustomOutlinedInput
                            id="judulPengaduan"
                            name="judulPengaduan"
                            value={formState.judulPengaduan || ''}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start"><IconTextRecognition /></InputAdornment>}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <CustomFormLabel htmlFor="deskripsiPermasalahan" sx={{ mt: 0, mb: 1 }}>
                                Deskripsi Permasalahan
                            </CustomFormLabel>
                        </Box>
                        <CustomOutlinedInput
                            id="deskripsiPermasalahan"
                            name="deskripsiPermasalahan"
                            value={formState.deskripsiPermasalahan}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
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

TambahKonselingIndividuForm.propTypes = {
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default TambahKonselingIndividuForm;
