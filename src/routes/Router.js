import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from 'src/components/protectedRoutes/protectedRoute';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Dashboards***** */
const DashboardAdmin = Loadable(lazy(() => import('../views/dashboard/Admin')));
const DashboardSiswa = Loadable(lazy(() => import('../views/dashboard/Siswa')));
const DashboardGuru = Loadable(lazy(() => import('../views/dashboard/Guru')));
const DashboardWaliSiswa = Loadable(lazy(() => import('../views/dashboard/WaliSiswa')));
// Siswa
const StudentList = Loadable(lazy(() => import('../views/apps/siswa/SiswaList')));
const StudentEdit = Loadable(lazy(() => import('../views/apps/siswa/SiswaEdit')));
// Konselor
const KonselorAdd = Loadable(lazy(() => import('../views/apps/konselor/KonselorAdd')))
const KonselorList = Loadable(lazy(() => import('../views/apps/konselor/KonselorList')));
const KonselorEdit = Loadable(lazy(() => import('../views/apps/konselor/KonselorEdit')));
// Pelanggaran
const PelanggaranList = Loadable(lazy(() => import('../views/apps/pelanggaran/PelanggaranList')));
const PelanggaranAdd = Loadable(lazy(() => import('../views/apps/pelanggaran/PelanggaranAdd')));
const PelanggaranEdit = Loadable(lazy(() => import('../views/apps/pelanggaran/PelanggaranEdit')));
// Kelas
const KelasList = Loadable(lazy(() => import('../views/apps/kelas/KelasList')));
const KelasAdd = Loadable(lazy(() => import('../views/apps/kelas/KelasAdd')));
const KelasEdit = Loadable(lazy(() => import('../views/apps/kelas/KelasEdit')));
const KelasDetail = Loadable(lazy(() => import('../views/apps/kelas/KelasDetail')));
// Wali Kelas
const WaliKelasList = Loadable(lazy(() => import('../views/apps/waliKelas/WaliKelasList')));
const WaliKelasAdd = Loadable(lazy(() => import('../views/apps/waliKelas/WaliKelasAdd')));
const WaliKelasEdit = Loadable(lazy(() => import('../views/apps/waliKelas/WaliKelasEdit')));
// Prestasi Madrasah
const PrestasiMadrasahList = Loadable(lazy(() => import('../views/apps/prestasiMadrasah/PrestasiMadrasahList')));
const PrestasiMadrasahAdd = Loadable(lazy(() => import('../views/apps/prestasiMadrasah/PrestasiMadrasahAdd')));
const PrestasiMadrasahEdit = Loadable(lazy(() => import('../views/apps/prestasiMadrasah/PrestasiMadrasahEdit')));
// Prestasi Individu
const PrestasiIndividuList = Loadable(lazy(() => import('../views/apps/prestasiIndividu/prestasiIndividuList')));
const PrestasiIndividuAdd = Loadable(lazy(() => import('../views/apps/prestasiIndividu/PrestasiIndividuAdd')));
const PrestasiIndividuEdit = Loadable(lazy(() => import('../views/apps/prestasiIndividu/PrestasiIndividuEdit')));
// Nama Regu
const NamaReguList = Loadable(lazy(() => import('../views/apps/prestasiRegu/NamaReguList')));
const NamaReguAdd = Loadable(lazy(() => import('../views/apps/prestasiRegu/NamaReguAdd')));
const NamaReguEdit = Loadable(lazy(() => import('../views/apps/prestasiRegu/NamaReguEdit')));
const NamaReguDetail = Loadable(lazy(() => import('../views/apps/prestasiRegu/NamaReguDetail')));
// Detail Prestasi Regu
const PrestasiReguAdd = Loadable(lazy(() => import('../views/apps/prestasiRegu/detail prestasi siswa/AddDetailPrestasiSiswa')));
const PrestasiReguEdit = Loadable(lazy(() => import('../views/apps/prestasiRegu/detail prestasi siswa/EditDetailPrestasiSiswa')));
// Bidang Bimbingan
const BidangBimbinganList = Loadable(lazy(() => import('../views/apps/bimbingan/BidangBimbinganList')));
const BidangBimbinganAdd = Loadable(lazy(() => import('../views/apps/bimbingan/BidangBimbinganAdd')));
const BidangBimbinganEdit = Loadable(lazy(() => import('../views/apps/bimbingan/BidangBimbinganEdit')));
// Tiket Konseling Individu
const TiketKonselingIndividuList = Loadable(lazy(() => import('../views/apps/tiketKonseling/TiketKonselingIndividuList')));
const TiketKonselingIndividuEdit = Loadable(lazy(() => import('../views/apps/tiketKonseling/TiketKonselingIndividuEdit')));
// Tiket Konsultasi Wali Siswa
const TiketKonsultasiList = Loadable(lazy(() => import('../views/apps/tiketKonsultasi/TiketKonsultasiList')));
const TiketKonsultasiEdit = Loadable(lazy(() => import('../views/apps/tiketKonsultasi/TiketKonsultasiEdit')));
// Kategori Poin
const KategoriPoinList = Loadable(lazy(() => import('../views/apps/kategoriPoin/KategoriPoinList')));
const KategoriPoinAdd = Loadable(lazy(() => import('../views/apps/kategoriPoin/KategoriPoinAdd')));
const KategoriPoinEdit = Loadable(lazy(() => import('../views/apps/kategoriPoin/KategoriPoinEdit')));
// Log Poin Siswa 
const LogPoinSiswaList = Loadable(lazy(() => import('../views/apps/logPoinSiswa/LogPoinSiswaList')));
// Poin Siswa 
const PoinSiswaList = Loadable(lazy(() => import('../views/apps/poinSiswa/PoinSiswaList')));
const PoinSiswaAdd = Loadable(lazy(() => import('../views/apps/poinSiswa/PoinSiswaAdd')));
// Status Keluarga
const StatusKeluargaList = Loadable(lazy(() => import('../views/apps/statusKeluarga/StatusKeluargaList')));
const StatusKeluargaAdd = Loadable(lazy(() => import('../views/apps/statusKeluarga/StatusKeluargaAdd')));
const StatusKeluargaEdit = Loadable(lazy(() => import('../views/apps/statusKeluarga/StatusKeluargaEdit')));
// Wali Siswa
const WaliSiswaList = Loadable(lazy(() => import('../views/apps/waliSiswa/WaliSiswaList')));
// Users
const UsersList = Loadable(lazy(() => import('../views/apps/users/UsersList')));
const UsersEdit = Loadable(lazy(() => import('../views/apps/users/UsersEdit')));

/* ****Dashboard Siswa***** */
const PrestasiIndividuSiswaList = Loadable(lazy(() => import('../views/apps/dashboardSiswa/PrestasiIndividuSiswaList'))); 
const KonselingIndividuSiswaAdd = Loadable(lazy(() => import('../views/apps/dashboardSiswa/KonselingIndividuAdd')));
const KonselingIndividuSiswaList = Loadable(lazy(() => import('../views/apps/dashboardSiswa/KonselingIndividuList')));
const CatatanKonseling = Loadable(lazy(() => import('../views/apps/dashboardSiswa/CatatanKonselingList')));

/* ****Dashboard Wali Siswa***** */
const KonsultasiWaliSiswaList =  Loadable(lazy(() => import('../views/apps/dashboardWaliSiswa/KonsultasiList')));
const KonsultasiWaliSiswaAdd =  Loadable(lazy(() => import('../views/apps/dashboardWaliSiswa/KonsultasiAdd')));
// Pages
const AccountSettingSiswa = Loadable(lazy(() => import('../views/pages/account-setting/AccountSettingSiswa')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const RegisterParents = Loadable(lazy(() => import('../views/authentication/auth1/RegisterParents')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const InternalError = Loadable(lazy(() => import('../views/authentication/500Error')));
const Forbidden = Loadable(lazy(() => import('../views/authentication/Forbidden')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const LandingPage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />, 
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register/student', element: <Register /> },
      { path: '/auth/register/parents', element: <RegisterParents /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/auth/500', element: <InternalError /> },
      { path: '/auth/forbidden', element: <Forbidden /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { 
        path: 'dashboard/admin',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: '', element: <DashboardAdmin /> },
          // Siswa
          { path: 'siswa', element: <StudentList /> },
          { path: 'siswa/edit/:id', element: <StudentEdit /> },
          // Konselor
          { path: 'konselor', element: <KonselorList /> },
          { path: 'konselor/tambah-konselor', element: <KonselorAdd /> },
          { path: 'konselor/edit/:id', element: <KonselorEdit /> },
          // Pelanggaran
          { path: 'pelanggaran', element: <PelanggaranList /> },
          { path: 'pelanggaran/add-pelanggaran', element: <PelanggaranAdd /> },
          { path: 'pelanggaran/edit/:id', element: <PelanggaranEdit /> },
          // Kelas
          { path: 'kelas', element: <KelasList /> },
          { path: 'kelas/tambah-kelas', element: <KelasAdd /> },
          { path: 'kelas/edit/:id', element: <KelasEdit /> },
          { path: 'kelas/detail/:id', element: <KelasDetail /> },
          // Wali Kelas
          { path: 'wali-kelas', element: <WaliKelasList /> },
          { path: 'wali-kelas/tambah-wali-kelas', element: <WaliKelasAdd /> },
          { path: 'wali-kelas/edit/:id', element: <WaliKelasEdit /> },
          // Prestasi Madrasah
          { path: 'prestasi/madrasah', element: <PrestasiMadrasahList /> },
          { path: 'prestasi/madrasah/tambah-prestasi-madrasah', element: <PrestasiMadrasahAdd /> },
          { path: 'prestasi/madrasah/edit/:id', element: <PrestasiMadrasahEdit /> },
          // Prestasi Individu
          { path: 'prestasi/individu', element: <PrestasiIndividuList /> },
          { path: 'prestasi/individu/tambah-prestasi-individu', element: <PrestasiIndividuAdd /> },
          { path: 'prestasi/individu/edit/:id', element: <PrestasiIndividuEdit /> },
          // Nama Regu
          { path: 'prestasi/regu', element: <NamaReguList /> },
          { path: 'prestasi/regu/tambah-nama-regu', element: <NamaReguAdd /> },
          { path: 'prestasi/regu/edit/:id', element: <NamaReguEdit /> },
          { path: 'prestasi/regu/detail/:id', element: <NamaReguDetail /> },
          // Prestasi Regu Detail
          { path: 'prestasi/regu/detail/:id/tambah-prestasi-siswa', element: <PrestasiReguAdd /> },
          { path: 'prestasi/regu/detail/:id/edit/:id', element: <PrestasiReguEdit /> },
          // Bidang Bimbingan
          { path: 'bidang-bimbingan', element: <BidangBimbinganList /> },
          { path: 'bidang-bimbingan/tambah-bidang-bimbingan', element: <BidangBimbinganAdd /> },
          { path: 'bidang-bimbingan/edit/:id', element: <BidangBimbinganEdit /> },
          // Tiket Konseling Individu
          { path: 'tiket-konseling-individu', element: <TiketKonselingIndividuList /> },
          { path: 'tiket-konseling-individu/konseling-edit/:id', element: <TiketKonselingIndividuEdit /> },
          // Tiket Konsultasi Wali Siswa
          { path: 'tiket-konsultasi', element: <TiketKonsultasiList /> },
          { path: 'tiket-konsultasi/konsultasi-edit/:id', element: <TiketKonsultasiEdit/> },
          // Kategori Poin
          { path: 'kategori-poin', element: <KategoriPoinList /> },
          { path: 'kategori-poin/tambah-kategori-poin', element: <KategoriPoinAdd /> },
          { path: 'kategori-poin/edit/:id', element: <KategoriPoinEdit /> },
          // Log Poin Siswa
          { path: 'log-poin', element: <LogPoinSiswaList /> }, 
          // Poin Siswa
          { path: 'poin', element: <PoinSiswaList /> }, 
          { path: 'poin/tambah-poin', element: <PoinSiswaAdd /> }, 
          // Status Keluarga
          { path: 'status-keluarga', element: <StatusKeluargaList /> }, 
          { path: 'status-keluarga/tambah-status-keluarga', element: <StatusKeluargaAdd /> }, 
          { path: 'status-keluarga/edit/:id', element: <StatusKeluargaEdit /> }, 
          // Wali Siswa
          { path: 'wali-siswa', element: <WaliSiswaList /> },
          // Users
          { path: 'users', element: <UsersList /> },
          { path: 'users/edit/:id', element: <UsersEdit /> },
        ],
      },
      {
        path: 'dashboard/siswa',
        element: <ProtectedRoute allowedRoles={['siswa']} />,
        children: [
          { path: '', element: <DashboardSiswa /> },
          { path: 'prestasi', element: <PrestasiIndividuSiswaList /> },
          { path: 'konseling-individu', element: <KonselingIndividuSiswaList /> },
          { path: 'konseling-individu/tambah-konseling-individu', element: <KonselingIndividuSiswaAdd /> },
          { path: 'catatan-konseling', element: <CatatanKonseling /> },
          { path: 'account-settings', element: <AccountSettingSiswa /> },
        ],
      },
      {
        path: 'dashboard/guru',
        element: <ProtectedRoute allowedRoles={['guru']} />,
        children: [
          { path: '', element: <DashboardGuru /> },
        ],
      },
      {
        path: 'dashboard/wali-siswa',
        element: <ProtectedRoute allowedRoles={['wali siswa']} />,
        children: [
          { path: '', element: <DashboardWaliSiswa /> },
          { path: 'konsultasi', element: <KonsultasiWaliSiswaList/> },
          { path: 'konsultasi/tambah-konsultasi', element: <KonsultasiWaliSiswaAdd/> },
        ],
      },
    ],
  },
];

export default Router;


// import React, { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import ProtectedRoute from 'src/components/protectedRoutes/protectedRoute';
// import Loadable from '../layouts/full/shared/loadable/Loadable';

// /* ***Layouts**** */
// const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// /* ****Dashboards***** */
// const DashboardAdmin = Loadable(lazy(() => import('../views/dashboard/Admin')));
// const DashboardSiswa = Loadable(lazy(() => import('../views/dashboard/Siswa')));
// const DashboardGuru = Loadable(lazy(() => import('../views/dashboard/Guru')));

// // /* ****Dashboard Admin***** */
// // const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
// // const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
// // const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
// // const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
// // const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
// // const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));
// // Siswa
// const StudentList = Loadable(lazy(() => import('../views/apps/siswa/SiswaList')));
// const StudentEdit = Loadable(lazy(() => import('../views/apps/siswa/SiswaEdit')));
// // Konselor
// const KonselorAdd = Loadable(lazy(() => import ('../views/apps/konselor/KonselorAdd')))
// const KonselorList = Loadable(lazy(() => import ('../views/apps/konselor/KonselorList')));
// const KonselorEdit = Loadable(lazy(() => import ('../views/apps/konselor/KonselorEdit')));
// // Pelanggaran
// const PelanggaranList = Loadable(lazy(() => import ('../views/apps/pelanggaran/PelanggaranList')));
// const PelanggaranAdd = Loadable(lazy(() => import ('../views/apps/pelanggaran/PelanggaranAdd')));
// const PelanggaranEdit = Loadable(lazy(() => import ('../views/apps/pelanggaran/PelanggaranEdit')));
// // Kelas
// const KelasList = Loadable(lazy(() => import ('../views/apps/kelas/KelasList')));
// const KelasAdd = Loadable(lazy(() => import ('../views/apps/kelas/KelasAdd')));
// const KelasEdit = Loadable(lazy(() => import ('../views/apps/kelas/KelasEdit')));
// const KelasDetail = Loadable(lazy(() => import ('../views/apps/kelas/KelasDetail')));
// // // Wali Kelas
// const WaliKelasList = Loadable(lazy(() => import ('../views/apps/waliKelas/WaliKelasList')));
// const WaliKelasAdd = Loadable(lazy(() => import ('../views/apps/waliKelas/WaliKelasAdd')));
// const WaliKelasEdit = Loadable(lazy(() => import ('../views/apps/waliKelas/WaliKelasEdit')));
// // // Prestasi Madrasah
// const PrestasiMadrasahList = Loadable(lazy(() => import ('../views/apps/prestasiMadrasah/PrestasiMadrasahList')));
// const PrestasiMadrasahAdd = Loadable(lazy(() => import ('../views/apps/prestasiMadrasah/PrestasiMadrasahAdd')));
// const PrestasiMadrasahEdit = Loadable(lazy(() => import ('../views/apps/prestasiMadrasah/PrestasiMadrasahEdit')));
// // // Prestasi Individu
// const PrestasiIndividuList = Loadable(lazy(() => import ('../views/apps/prestasiIndividu/prestasiIndividuList')));
// const PrestasiIndividuAdd = Loadable(lazy(() => import ('../views/apps/prestasiIndividu/PrestasiIndividuAdd')));
// const PrestasiIndividuEdit = Loadable(lazy(() => import ('../views/apps/prestasiIndividu/PrestasiIndividuEdit')));
// // // Nama Regu
// const NamaReguList = Loadable(lazy(() => import ('../views/apps/prestasiRegu/NamaReguList')));
// const NamaReguAdd = Loadable(lazy(() => import ('../views/apps/prestasiRegu/NamaReguAdd')));
// const NamaReguEdit = Loadable(lazy(() => import ('../views/apps/prestasiRegu/NamaReguEdit')));
// const NamaReguDetail = Loadable(lazy(() => import ('../views/apps/prestasiRegu/NamaReguDetail')));
// // // Detail Prestasi Regu
// const PrestasiReguAdd = Loadable(lazy(() => import ('../views/apps/prestasiRegu/detail prestasi siswa/AddDetailPrestasiSiswa')));
// const PrestasiReguEdit = Loadable(lazy(() => import ('../views/apps/prestasiRegu/detail prestasi siswa/EditDetailPrestasiSiswa')));
// // // Bidang Bimbingan
// const BidangBimbinganList = Loadable(lazy(() => import ('../views/apps/bimbingan/BidangBimbinganList')));
// const BidangBimbinganAdd = Loadable(lazy(() => import ('../views/apps/bimbingan/BidangBimbinganAdd')));
// const BidangBimbinganEdit = Loadable(lazy(() => import ('../views/apps/bimbingan/BidangBimbinganEdit')));
// // // Tiket Konseling Individu
// const TiketKonselingIndividuList = Loadable(lazy(() => import ('../views/apps/tiketKonseling/TiketKonselingIndividuList')));
// const TiketKonselingIndividuEdit = Loadable(lazy(() => import ('../views/apps/tiketKonseling/TiketKonselingIndividuEdit')));
// // Kategori Poin
// const KategoriPoinList = Loadable(lazy(() => import ('../views/apps/kategoriPoin/KategoriPoinList')));
// const KategoriPoinAdd = Loadable(lazy(() => import ('../views/apps/kategoriPoin/KategoriPoinAdd')));
// const KategoriPoinEdit = Loadable(lazy(() => import ('../views/apps/kategoriPoin/KategoriPoinEdit')));
// // Users
// const UsersList = Loadable(lazy(() => import ('../views/apps/users/UsersList')));
// const UsersEdit = Loadable(lazy(() => import ('../views/apps/users/UsersEdit')));

// /* ****Dashboard Siswa***** */
// const PrestasiIndividuSiswaList = Loadable(lazy(() => import ('../views/apps/dashboardSiswa/PrestasiIndividuSiswaList'))); 
// const KonselingIndividuSiswaAdd = Loadable(lazy(() => import ('../views/apps/dashboardSiswa/KonselingIndividuAdd')));
// const KonselingIndividuSiswaList = Loadable(lazy(() => import ('../views/apps/dashboardSiswa/KonselingIndividuList')));
// const CatatanKonseling = Loadable(lazy(() => import ('../views/apps/dashboardSiswa/CatatanKonselingList')));

// // Pages
// // const AccountSetting = Loadable(lazy(() => import('../views/pages/account-setting/AccountSetting')),);
// const AccountSettingSiswa = Loadable(lazy(() => import('../views/pages/account-setting/AccountSettingSiswa')),);


// // authentication
// const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
// const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
// const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
// const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
// const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const InternalError = Loadable(lazy(() => import('../views/authentication/500Error')));
// const Forbidden = Loadable(lazy(() => import('../views/authentication/Forbidden')));
// const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// // landingpage
// const LandingPage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));



// const Router = [
//   {
//     path: '/',
//     element: <BlankLayout />, 
//     children: [
//       { path: '/', element: <LandingPage /> },
//       { path: '/auth/404', element: <Error /> },
//       { path: '/auth/login', element: <Login /> },
//       { path: '/auth/register', element: <Register /> },
//       { path: '/auth/forgot-password', element: <ForgotPassword /> },
//       { path: '/auth/two-steps', element: <TwoSteps /> },
//       { path: '/auth/maintenance', element: <Maintenance /> },
//       { path: '/auth/500', element: <InternalError /> },
//       { path: '/auth/forbidden', element: <Forbidden/> },
//       { path: '*', element: <Navigate to="/auth/404" /> },
//     ],
//   },
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [
//       {
//         path: '/dashboard/admin',
//         element: <ProtectedRoute allowedRoles={['admin']} />,
//         children: [
//           { path: '/dashboard/admin', element: <DashboardAdmin /> },
//           // Siswa
//           { path: 'siswa', element: <StudentList /> },
//           { path: 'siswa/edit/:id', element: <StudentEdit /> },
//           // Konselor
//           { path: 'konselor', element: <KonselorList/> },
//           { path: 'konselor/tambah-konselor', element: <KonselorAdd/> },
//           { path: 'konselor/edit/:id', element: <KonselorEdit/> },
//           // Pelanggaran
//           { path: 'pelanggaran', element: <PelanggaranList/> },
//           { path: 'pelanggaran/add-pelanggaran', element: <PelanggaranAdd/> },
//           { path: 'pelanggaran/edit/:id', element: <PelanggaranEdit/> },
//           // Kelas
//           { path: 'kelas', element: <KelasList /> },
//           { path: 'kelas/tambah-kelas', element: <KelasAdd /> },
//           { path: 'kelas/edit/:id', element: <KelasEdit /> },
//           { path: 'kelas/detail/:id', element: <KelasDetail /> },
//           // Wali Kelas
//           { path: 'wali-kelas', element: <WaliKelasList/> },
//           { path: 'wali-kelas/tambah-wali-kelas', element: <WaliKelasAdd/> },
//           { path: 'wali-kelas/edit/:id', element: <WaliKelasEdit/> },
//           // Prestasi Madrasah
//           { path: 'prestasi/madrasah', element: <PrestasiMadrasahList/> },
//           { path: 'prestasi/madrasah/tambah-prestasi-madrasah', element: <PrestasiMadrasahAdd/> },
//           { path: 'prestasi/madrasah/edit/:id', element: <PrestasiMadrasahEdit/> },
//           // Prestasi Individu
//           { path: 'prestasi/individu', element: <PrestasiIndividuList/> },
//           { path: 'prestasi/individu/tambah-prestasi-individu', element: <PrestasiIndividuAdd/> },
//           { path: 'prestasi/individu/edit/:id', element: <PrestasiIndividuEdit/> },
//           // Nama Regu
//           { path: 'prestasi/regu', element: <NamaReguList/> },
//           { path: 'prestasi/regu/tambah-nama-regu', element: <NamaReguAdd/> },
//           { path: 'prestasi/regu/edit/:id', element: <NamaReguEdit/> },
//           { path: 'prestasi/regu/detail/:id', element: <NamaReguDetail/> },
//           // Prestasi Regu Detail
//           { path: 'prestasi/regu/detail/:id/tambah-prestasi-siswa', element: <PrestasiReguAdd/> },
//           { path: 'prestasi/regu/detail/:id//edit/:id', element: <PrestasiReguEdit/> },
//           // Bidang Bimbingan
//           { path: 'bidang-bimbingan', element: <BidangBimbinganList/> },
//           { path: 'bidang-bimbingan/tambah-bidang-bimbingan', element: <BidangBimbinganAdd/> },
//           { path: 'bidang-bimbingan/edit/:id', element: <BidangBimbinganEdit/> },
//           // Tiket Konseling Individu
//           { path: 'tiket-konseling-individu', element: <TiketKonselingIndividuList/> },
//           { path: 'tiket-konseling-individu/konseling-edit/:id', element: <TiketKonselingIndividuEdit/> },
//           // Kategori Poin
//           { path: 'kategori-poin', element: <KategoriPoinList/> },
//           { path: 'kategori-poin/tambah-kategori-poin', element: <KategoriPoinAdd/> },
//           { path: 'kategori-poin/edit/:id', element: <KategoriPoinEdit/> },
//           // Users
//           { path: 'users', element: <UsersList/> },
//           { path: 'users/edit/:id', element: <UsersEdit/> },
//         ],
//       },
//       // rute lain di luar dashboard/admin yang tidak dilindungi
//     ],
//   },
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [
//       {
//         path: '/dashboard/siswa',
//         element: <ProtectedRoute allowedRoles={['siswa']} />,
//         children: [
//           { path: '/dashboard/siswa', element: <DashboardSiswa /> },
//           { path: 'prestasi', element: <PrestasiIndividuSiswaList/> },
//           { path: 'konseling-individu', element: <KonselingIndividuSiswaList/> },
//           { path: 'konseling-individu/tambah-konseling-individu', element: <KonselingIndividuSiswaAdd/> },
//           { path: 'catatan-konseling', element: <CatatanKonseling/> },
//           { path: 'account-settings', element: <AccountSettingSiswa/> },
//         ],
//         },
//       ],
//     },
//     {
//       path: '/',
//       element: <FullLayout />,
//       children: [
//         {
//           path: '/dashboard/guru',
//           element: <ProtectedRoute allowedRoles={['guru']} />,
//           children: [
//             { path: '/dashboard/siswa', element: <DashboardGuru /> },
//           ],
//           },
//         ],
//       },
// ];

// export default Router;