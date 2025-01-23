import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Divider, IconButton, InputAdornment, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Alerts from 'src/components/alerts/Alerts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confPassword, setConfPassword] = useState('');
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [jenis_kelamin_id, setJenisKelaminId] = useState(''); 
    const [tanggal_lahir, setTanggalLahir] = useState(null);
    const [kelas_id, setKelasId] = useState(''); 
    const [alamat, setAlamat] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Fetch Gender Options using useQuery
    const { data: genderOptions = [], isError: genderError } = useQuery('genderOptions', async () => {
        const response = await axios.get('http://localhost:4000/jenis-kelamin');
        return response.data;
    });

    // Fetch Kelas Options using useQuery
    const { data: kelasOptions = [], isError: kelasError } = useQuery('kelasOptions', async () => {
        const response = await axios.get('http://localhost:4000/kelas/auth/kelas');
        return response.data.sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas));
    });

    // Mutation for registration
    const mutation = useMutation(
        async (newUser) => {
            return await axios.post('http://localhost:4000/auth/register', newUser);
        },
        {
            onSuccess: () => {
                setSuccess('Registrasi berhasil! Silakan login.');
                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
            },
            onError: (error) => {
                if (error.response) {
                    setError(error.response.data.msg);
                }
            }
        }
    );

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        mutation.mutate({
            name,
            email,
            password,
            confPassword,
            jenis_kelamin_id,
            tanggal_lahir,
            kelas_id,
            alamat
        });
    };

    if (genderError || kelasError) {
        return <div>Error loading data...</div>;
    }

    return (
        <>
            <Typography fontWeight="700" variant="h4" mb={1}>
                <Alerts error={error} success={success} />
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
                        Daftar sebagai siswa
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
                    <Grid>
                        <CustomFormLabel htmlFor="jenis_kelamin_id">Jenis Kelamin</CustomFormLabel>
                        <CustomSelect
                            id="jenis_kelamin_id"
                            value={jenis_kelamin_id}
                            onChange={(e) => setJenisKelaminId(e.target.value)}
                            fullWidth
                            variant="outlined"
                        >
                            {genderOptions.map((genderOption) => (
                                <MenuItem key={genderOption.id} value={genderOption.id}>
                                    {genderOption.jenis_kelamin}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>

                    <CustomFormLabel htmlFor="tanggal_lahir">Tanggal Lahir</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(props) => (
                                <CustomTextField
                                    {...props}
                                    fullWidth
                                    size="medium"
                                />
                            )}
                            placeholder="Tanggal Lahir"
                            value={tanggal_lahir}
                            onChange={(newValue) => setTanggalLahir(newValue)}
                            required
                        />
                    </LocalizationProvider>
                    <CustomFormLabel htmlFor="kelas_id">Kelas</CustomFormLabel>
                    <CustomSelect
                       id="kelas_id"
                       name="kelas_id"
                       value={kelas_id}
                       onChange={(e) => setKelasId(e.target.value)}
                       fullWidth
                       variant="outlined"
                       required
                    >
                        {kelasOptions.map((kelasOption) => (
                            <MenuItem key={kelasOption.id} value={kelasOption.id}>
                                {kelasOption.nama_kelas}
                            </MenuItem>
                            ))}
                    </CustomSelect>
                    <CustomFormLabel htmlFor="alamat">Alamat</CustomFormLabel>
                    <CustomTextField
                        id="alamat"
                        variant="outlined"
                        placeholder="Alamat"
                        fullWidth
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                    />
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

export default AuthRegister;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, Button, Divider, IconButton, InputAdornment, MenuItem, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Alerts from 'src/components/alerts/Alerts';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
// import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
// import { Stack } from '@mui/system';
// import AuthSocialButtons from './AuthSocialButtons';
// import CustomSelect from 'src/components/forms/theme-elements/CustomSelect'; 

// const AuthRegister = ({ title, subtitle, subtext }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [confPassword, setConfPassword] = useState('');
//     const [showConfPassword, setShowConfPassword] = useState(false);
//     const [jenis_kelamin_id, setJenisKelaminId] = useState(''); 
//     const [tanggal_lahir, setTanggalLahir] = useState(null);
//     const [kelas_id, setKelasId] = useState(''); 
//     const [alamat, setAlamat] = useState('');
//     const [genderOptions, setGenderOptions] = useState([]);
//     const [kelasOptions, setKelasOptions] = useState([]);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGenderOptions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/jenis-kelamin');
//                 setGenderOptions(response.data);
//                 console.log(response.data)
//             } catch (error) {
//                 console.error("Error fetching gender options:", error);
//             }
//         };

//         const fetchKelasOptions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/kelas/auth/kelas');
//                 const sortedKelas = response.data.sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas));
//                 setKelasOptions(sortedKelas);
//                 console.log(sortedKelas);
//             } catch (error) {
//                 console.error("Error fetching kelas options:", error);
//             }
//         };

//         fetchGenderOptions();
//         fetchKelasOptions();
//     }, []);

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
//         try {
//             await axios.post('http://localhost:4000/auth/register', {
//                 name,
//                 email,
//                 password,
//                 confPassword,
//                 jenis_kelamin_id, 
//                 tanggal_lahir,
//                 kelas_id, 
//                 alamat
//             });
//             setSuccess('Registrasi berhasil! Silakan login.');
//             setTimeout(() => {
//                 navigate('/auth/login');
//             }, 3000); // Redirect after 2 seconds
//         } catch (error) {
//             if (error.response) {
//                 console.log(error.response.data);
//                 setError(error.response.data.msg);
//             }
//         }
//     }

//     return (
//         <>
//             <Typography fontWeight="700" variant="h4" mb={1}>
//           <Alerts error={error} success={success}/>
//           {title}
//         </Typography>
//             {subtext}
//             <AuthSocialButtons title="Sign up with" />
//             <Box mt={3}>
//                 <Divider>
//                     <Typography
//                         component="span"
//                         color="textPrimary"
//                         variant="h6"
//                         fontWeight="400"
//                         position="relative"
//                         px={2}
//                     >
//                         Daftar sebagai siswa
//                     </Typography>
//                 </Divider>
//             </Box>
//             <Box component="form" onSubmit={handleRegister}>
//                 <Stack mb={3}>
//                     <CustomFormLabel htmlFor="name">Nama Lengkap</CustomFormLabel>
//                     <CustomTextField
//                         id="name"
//                         variant="outlined"
//                         placeholder="Nama Lengkap"
//                         fullWidth
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         autoComplete="name"
//                     />
//                     <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
//                     <CustomTextField
//                         id="email"
//                         variant="outlined"
//                         placeholder="@example"
//                         fullWidth
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         autoComplete="email"
//                     />
//                     <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
//                     <CustomTextField
//                         id="password"
//                         variant="outlined"
//                         fullWidth
//                         value={password}
//                         type={showPassword ? 'text' : 'password'}
//                         onChange={(e) => setPassword(e.target.value)}
//                         InputProps={{
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         onMouseDown={(e) => e.preventDefault()}
//                                     >
//                                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         }}
//                         required
//                     />
//                     <CustomFormLabel htmlFor="confPassword">Konfirmasi Password</CustomFormLabel>
//                     <CustomTextField
//                         id="confPassword"
//                         variant="outlined"
//                         fullWidth
//                         value={confPassword}
//                         type={showConfPassword ? 'text' : 'password'}
//                         onChange={(e) => setConfPassword(e.target.value)}
//                         InputProps={{
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         onClick={() => setShowConfPassword(!showConfPassword)}
//                                         onMouseDown={(e) => e.preventDefault()}
//                                     >
//                                         {showConfPassword ? <Visibility /> : <VisibilityOff />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         }}
//                         required
//                     />
//                     <Grid>
//                         <CustomFormLabel htmlFor="jenis_kelamin_id">Jenis Kelamin</CustomFormLabel>
//                         <CustomSelect
//                             id="jenis_kelamin_id"
//                             value={jenis_kelamin_id}
//                             onChange={(e) => setJenisKelaminId(e.target.value)}
//                             fullWidth
//                             variant="outlined"
//                         >
//                             {genderOptions.map((genderOption) => (
//                                 <MenuItem key={genderOption.id} value={genderOption.id}>
//                                     {genderOption.jenis_kelamin}
//                                 </MenuItem>
//                             ))}
//                         </CustomSelect>
//                     </Grid>

//                     <CustomFormLabel htmlFor="tanggal_lahir">Tanggal Lahir</CustomFormLabel>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <DatePicker
//                             renderInput={(props) => (
//                                 <CustomTextField
//                                     {...props}
//                                     fullWidth
//                                     size="medium"
//                                 />
//                             )}
//                             placeholder="Tanggal Lahir"
//                             value={tanggal_lahir}
//                             onChange={(newValue) => setTanggalLahir(newValue)}
//                             required
//                         />
//                     </LocalizationProvider>
//                     <CustomFormLabel htmlFor="kelas_id">Kelas</CustomFormLabel>
//                     <CustomSelect
//                        id="kelas_id"
//                        name="kelas_id"
//                        value={kelas_id}
//                        onChange={(e) => setKelasId(e.target.value)}
//                        fullWidth
//                        variant="outlined"
//                        required
//                     >
//                         {kelasOptions.map((kelasOption) => (
//                             <MenuItem key={kelasOption.id} value={kelasOption.id}>
//                                 {kelasOption.nama_kelas}
//                             </MenuItem>
//                             ))}
//                     </CustomSelect>
//                     <CustomFormLabel htmlFor="alamat">Alamat</CustomFormLabel>
//                     <CustomTextField
//                         id="alamat"
//                         variant="outlined"
//                         placeholder="Alamat"
//                         fullWidth
//                         value={alamat}
//                         onChange={(e) => setAlamat(e.target.value)}
//                         required
//                     />
//                 </Stack>
//                 <Button
//                     color="primary"
//                     variant="contained"
//                     style={{ color: 'white' }}
//                     size="large"
//                     fullWidth
//                     type="submit"
//                     sx={{
//                     backgroundColor: "#F48C06",
//                     '&:hover': { backgroundColor: "#2F327D" },
//                     }}
//                 >
//                     Sign Up
//                 </Button>
//             </Box>

//             {subtitle}
//         </>
//     );
// };

// export default AuthRegister;