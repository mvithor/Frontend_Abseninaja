import { useState, useEffect } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, InputAdornment, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import axiosInstance from 'src/utils/axiosInstance';
import Alerts from 'src/components/alerts/Alerts';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser, clearUser } from 'src/store/apps/user/userSlice';
import {jwtDecode} from 'jwt-decode';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId] = useState(`device-${Date.now()}`); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('expired')) {
      console.warn('Session expired. Clearing user state.');
      setError('Sesi anda telah berakhir. Silahkan login kembali');
      dispatch(clearUser());
  
      setTimeout(() => {
        navigate('/'); 
      }, 5000); 
    }
  }, [location.search, dispatch, navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Login request initiated with email:', email);

      const response = await axiosInstance.post('/api/v1/login', { email, password, deviceId });
      const { accessToken } = response.data;

      // Decode token to extract user information
      const decodedToken = jwtDecode(accessToken);
      const { userId, name, role } = decodedToken;

      console.log('Login successful. Decoded token:', decodedToken);

      // Save user data and access token in Redux
      dispatch(setUser({ name, role, userId, accessToken }));

      setSuccess('Login berhasil! Mengarahkan...');
      setTimeout(() => {
        switch (role) {
          case 'super admin':
            navigate('/dashboard/admin');
            break;
          case 'admin sekolah':
            navigate('/dashboard/admin-sekolah');
            break;
          case 'pegawai':
            navigate('/dashboard/pegawai');
            break;
          default:
            console.error('Invalid role:', role);
            setError('Pengguna tidak valid.');
            dispatch(clearUser());
        }
      }, 2000);
    } catch (error) {
      console.error('Login error:', error.response?.data?.msg || error.message);
      setError(error.response?.data?.msg || 'Terjadi kesalahan, silakan coba lagi.');
      dispatch(clearUser());
    }
  };

  return (
    <>
      <Typography fontWeight="700" variant="h4" mb={1}>
        <Alerts error={error} success={success} />
        {title}
      </Typography>
      {subtext}
      {/* <AuthSocialButtons title="Sign in with" /> */}
      {/* <Box mt={3}>
        <Divider>
          <Typography component="span" color="textPrimary" variant="h6" fontWeight="400" position="relative" px={2}>
            or sign in with
          </Typography>
        </Divider>
      </Box> */}

      <Stack>
        <Box component="form" onSubmit={handleLogin}>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            name="email"
            variant="outlined"
            placeholder="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            sx={{
              '& .MuiInputBase-input::placeholder': { color: 'gray' },
            }}
          />
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            variant="outlined"
            placeholder="Password"
            fullWidth
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            sx={{
              '& .MuiInputBase-input::placeholder': { color: 'gray' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#973BE0",
              '&:hover': { backgroundColor: "#2A85FF" },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;






// import React, { useState, useEffect } from 'react';
// import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Divider, InputAdornment, IconButton } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import axiosInstance from 'src/utils/axiosInstance';
// import Alerts from 'src/components/alerts/Alerts';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
// import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
// import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
// import AuthSocialButtons from './AuthSocialButtons';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { setUser } from 'src/store/apps/user/userSlice';
// import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode'; // Pastikan impor ini tanpa { }

// const AuthLogin = ({ title, subtitle, subtext }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(''); 
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     if (searchParams.get('expired')) {
//       setError('Sesi anda telah berakhir. Silahkan login kembali.');
//     }
//   }, [location.search]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       console.log('Mengirim permintaan login ke backend...');
//       const response = await axiosInstance.post('/api/v1/login', {
//         email,
//         password,
//       });
  
//       console.log('Respons dari backend:', response.data);
  
//       const { accessToken, refreshToken } = response.data;
  
//       // Dekode token untuk mendapatkan user info dari payload
//       const decodedToken = jwtDecode(accessToken); // Mendekode token
  
//       // Destrukturisasi data dari decodedToken
//       const { userId, name, role } = decodedToken; // Mendeklarasi email setelah decodedToken
  
//       console.log('Dekode token:', decodedToken); // Cek data yang didapat dari token
  
//       // Simpan access token di localStorage
//       localStorage.setItem('accessToken', accessToken);
  
//       // Simpan refresh token di cookie
//       Cookies.set('refreshToken', refreshToken, { expires: 1 }); // Refresh token expires in 1 day
  
//       // Simpan user data ke Redux state
//       dispatch(setUser({ name, role, userId }));

//       setSuccess('Login successful! Redirecting...'); // Set pesan sukses

//       setTimeout(() => {
//         if (role === 'super admin') {
//           navigate('/dashboard/admin');
//         } else if (role === 'admin sekolah') {
//           navigate('/dashboard/admin-sekolah');
//         } else {
//           setError('Pengguna tidak ditemukan');
//           setTimeout(() => {
//             setError('');
//           }, 3000);
//         }
//       }, 2000); // Menunda navigasi selama 2 detik
      
//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data.msg);
//       } else {
//         setError('Something went wrong. Please try again later.');
//       }
//     }
//   };

//   return (
//     <>
//         <Typography fontWeight="700" variant="h4" mb={1}>
//           <Alerts error={error} success={success}/>
//           {title}
//         </Typography>
//       {subtext}
//       <AuthSocialButtons title="Sign in with" />
//       <Box mt={3}>
//         <Divider>
//           <Typography component="span" color="textPrimary" variant="h6" fontWeight="400" position="relative" px={2}>
//             or sign in with
//           </Typography>
//         </Divider>
//       </Box>

//       <Stack>
//         <Box component="form" onSubmit={handleLogin}>
//           <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
//           <CustomTextField
//             id="email"
//             name="email"
//             variant="outlined"
//             placeholder="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             autoComplete="email"
//             sx={{
//               '& .MuiInputBase-input::placeholder': {
//                 color: 'gray',
//               },
//             }}
//           />
//           <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
//           <CustomTextField
//             id="password"
//             name="password"
//             variant="outlined"
//             placeholder="Password"
//             fullWidth
//             value={password}
//             type={showPassword ? 'text' : 'password'}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             autoComplete="current-password"
//             sx={{
//               '& .MuiInputBase-input::placeholder': {
//                 color: 'gray',
//               },
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     onMouseDown={(e) => e.preventDefault()}
//                     edge="end"
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Stack
//             justifyContent="space-between"
//             direction="row"
//             alignItems="center"
//             my={2}
//           >
//             <FormGroup>
//               <FormControlLabel
//                 control={<CustomCheckbox defaultChecked />}
//                 label="Remember this Device"
//               />
//             </FormGroup>
//             <Typography
//               component={Link}
//               to="/auth/forgot-password"
//               fontWeight="500"
//               sx={{
//                 textDecoration: 'none',
//                 color: 'primary.main',
//               }}
//             >
//               Forgot Password?
//             </Typography>
//           </Stack>
//           <Button
//             color="primary"
//             variant="contained"
//             style={{ color: 'white' }}
//             size="large"
//             fullWidth
//             type="submit"
//             sx={{
//               backgroundColor: "#F48C06",
//               '&:hover': { backgroundColor: "#2F327D" },
//             }}
//           >
//             Sign In
//           </Button>
//         </Box>
//       </Stack>
//       {subtitle}
//     </>
//   );
// };

// export default AuthLogin;
