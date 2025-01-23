import axios from 'axios';
import { store } from 'src/store/Store';
import { setUser, clearUser } from 'src/store/apps/user/userSlice';
import {jwtDecode} from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'https://api.abseninaja.com',
  timeout: 10000,
  withCredentials: true, // Kirim cookie untuk autentikasi
});

// Interceptor untuk menambahkan access token ke header
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken;

    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        const currentTime = Math.floor(Date.now() / 1000);

        // Periksa apakah token sudah kadaluarsa
        if (decodedToken.exp < currentTime) {
          store.dispatch(clearUser());
          window.location.href = '/auth/login';
          return Promise.reject(new Error('Token expired.'));
        }

        // Tambahkan token ke header
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['x-user-id'] = decodedToken.userId; 
      } catch (error) {
        store.dispatch(clearUser());
        window.location.href = '/';
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
      try {
        const decodedToken = jwtDecode(newToken); // Decode token baru
        // Perbarui token di Redux state
        store.dispatch(
          setUser({
            name: decodedToken.name, 
            role: decodedToken.role,
            userId: decodedToken.userId,
            accessToken: newToken,
          })
        );
      } catch (error) {
        console.error('Error saat memproses token baru:', error.message);
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearUser());
      window.location.href = '/';
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
