import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, IconButton, InputAdornment, MenuItem, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alerts from 'src/components/alerts/Alerts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { Stack } from '@mui/system';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect'; 

const AuthRegisterParents = ({title, subtitle, subtext}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confPassword, setConfPassword] = useState('');
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [nik, setNik] = useState(''); 
    const [pekerjaan, setPekerjaan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomor_telepon, setNomorTelepon] = useState('');
    const [status_keluarga_id, setStatusKeluargaId] = useState('');
    const [statusKeluargaOptions, setStatusKeluargaOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatusKeluarga = async () => {
            try {
                const response = await axios.get('http://localhost:4000/status-keluarga/options');
                const sortedStatusKeluarga = response.data.sort((a, b) => a.nama_status.localeCompare(b.nama_status));
                setStatusKeluargaOptions(sortedStatusKeluarga);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching status keluarga options:", error);
            }
        };
        fetchStatusKeluarga();
    }, []);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post('http://localhost:4000/auth/register/wali-siswa', {
                name,
                email,
                password,
                confPassword,
                nik,
                pekerjaan,
                alamat,
                nomor_telepon,
                status_keluarga_id
            });
            setSuccess('Registrasi berhasil! Silakan login.');
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000); 
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response.data.msg);
            }
        }
    }

    return (
        <>
         <Typography fontWeight="700" variant="h4" mb={1}>
          <Alerts error={error} success={success}/>
          {title}
        </Typography>
            {subtext}
            <AuthSocialButtons title="Sign up with" />
            <Box mt={3}>
                <Divider>
                    <Typography
                        component="span"
                        color="textPrimary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                    >
                        Daftar sebagai wali siswa
                    </Typography>
                </Divider>
            </Box>

            <Box component="form" onSubmit={handleRegister}>
                <Stack mb={3}>
                <CustomFormLabel htmlFor="name">Nama Lengkap</CustomFormLabel>
                    <CustomTextField
                        id="name"
                        variant="outlined"
                        placeholder="Nama Lengkap"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                 <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        placeholder="@example"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                 <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                    <CustomTextField
                        id="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                 <CustomFormLabel htmlFor="confPassword">Konfirmasi Password</CustomFormLabel>
                    <CustomTextField
                        id="confPassword"
                        variant="outlined"
                        fullWidth
                        value={confPassword}
                        type={showConfPassword ? 'text' : 'password'}
                        onChange={(e) => setConfPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfPassword(!showConfPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showConfPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                 <CustomFormLabel htmlFor="nik">Nomor Induk Kependudukan</CustomFormLabel>
                    <CustomTextField
                        id="nik"
                        variant="outlined"
                        placeholder="Nomor Induk Kependudukan"
                        fullWidth
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        required
                    />
                <CustomFormLabel htmlFor="pekerjaan">Pekerjaan</CustomFormLabel>
                    <CustomTextField
                        id="pekerjaan"
                        variant="outlined"
                        placeholder="Pekerjaan"
                        fullWidth
                        value={pekerjaan}
                        onChange={(e) => setPekerjaan(e.target.value)}
                        required
                    />
                 <CustomFormLabel htmlFor="alamat">Alamat</CustomFormLabel>
                    <CustomTextField
                        id="alamat"
                        variant="outlined"
                        placeholder="Gunung Rejo, Way Lima, Pesawaran"
                        fullWidth
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                    />
                <CustomFormLabel htmlFor="nomor_telepon">Nomor Telepon</CustomFormLabel>
                    <CustomTextField
                        id="nomor_telepon"
                        variant="outlined"
                        placeholder="nomor telepon"
                        fullWidth
                        value={nomor_telepon}
                        onChange={(e) => setNomorTelepon(e.target.value)}
                        required
                    />
                 <CustomFormLabel htmlFor="status_keluarga_id">Status Keluarga</CustomFormLabel>
                    <CustomSelect
                       id="status_keluarga_id"
                       name="status_keluarga_id"
                       placeholder="Pilih status keluarga"
                       value={status_keluarga_id}
                       onChange={(e) => setStatusKeluargaId(e.target.value)}
                       fullWidth
                       variant="outlined"
                       required
                    >
                        {statusKeluargaOptions.map((statusKeluargaOptions) => (
                            <MenuItem key={statusKeluargaOptions.id} value={statusKeluargaOptions.id}>
                                {statusKeluargaOptions.nama_status}
                            </MenuItem>
                            ))}
                    </CustomSelect>
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ color: 'white' }}
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{
                    backgroundColor: "#F48C06",
                    '&:hover': { backgroundColor: "#2F327D" },
                    }}
                >
                    Sign Up
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegisterParents;