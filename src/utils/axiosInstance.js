import axios from 'axios';
import { store } from 'src/store/Store';
import { setUser, clearUser } from 'src/store/apps/user/userSlice';
import {jwtDecode} from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://108.136.56.78/',
  timeout: 10000,
  withCredentials: true, // Kirim cookie untuk autentikasi
});

// Interceptor untuk menambahkan access token ke header
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken;

    if (token) {
      console.log('Access Token yang dikirim:', token);
      try {
        const decodedToken = jwtDecode(token); // Decode token untuk validasi
        const currentTime = Math.floor(Date.now() / 1000);

        // Periksa apakah token sudah kadaluarsa
        if (decodedToken.exp < currentTime) {
          console.warn('Token telah kadaluarsa. Silakan login ulang.');
          store.dispatch(clearUser());
          window.location.href = '/auth/login';
          return Promise.reject(new Error('Token expired.'));
        }

        // Tambahkan token ke header
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['x-user-id'] = decodedToken.userId; // Contoh pemanfaatan decodedToken
      } catch (error) {
        console.error('Error saat memproses token:', error.message);
        store.dispatch(clearUser());
        window.location.href = '/auth/login';
        return Promise.reject(new Error('Invalid token.'));
      }
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani respon dan memperbarui token
axiosInstance.interceptors.response.use(
  (response) => {
    // Jika backend mengirimkan token baru melalui header `x-access-token`
    const newToken = response.headers['x-access-token'];
    if (newToken) {
      console.log('Token baru diterima:', newToken);
      try {
        const decodedToken = jwtDecode(newToken); // Decode token baru

        // Perbarui token di Redux state
        store.dispatch(
          setUser({
            name: decodedToken.name, // Ambil data user dari token baru
            role: decodedToken.role,
            userId: decodedToken.userId,
            accessToken: newToken,
          })
        );
        console.log('Token berhasil diperbarui di Redux state.');
      } catch (error) {
        console.error('Error saat memproses token baru:', error.message);
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized: Token tidak valid atau sudah kadaluarsa.');
      store.dispatch(clearUser());
      window.location.href = '/auth/login';
    }

    console.error('Response Error:', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;








// import axios from 'axios';
// import Cookies from 'js-cookie'; 

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4000/',
//   timeout: 10000,
//   withCredentials: true, 
// });

// // Interceptor untuk menambahkan access token ke header setiap request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Interceptor untuk menangani expired access token dan refresh token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Jika error 401 karena token expired
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mencegah infinite loop jika permintaan berulang
      
//       try {
//         // Menggunakan refresh token dari cookie untuk mendapatkan access token baru
//         const refreshToken = Cookies.get('refreshToken');
//         const res = await axiosInstance.get('/token', {
//           headers: {
//             'Authorization': `Bearer ${refreshToken}`,
//           },
//           withCredentials: true, // Mengirimkan cookie refresh token
//         });

//         const { accessToken } = res.data;

//         // Simpan access token baru di localStorage
//         localStorage.setItem('accessToken', accessToken);

//         // Set access token baru ke header Authorization
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//         // Coba ulangi request yang gagal dengan access token baru
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Jika refresh token gagal, redirect ke halaman login
//         localStorage.removeItem('accessToken');
//         Cookies.remove('refreshToken'); // Hapus refresh token
//         window.location.href = '/auth/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4000/',
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('accessToken');
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
