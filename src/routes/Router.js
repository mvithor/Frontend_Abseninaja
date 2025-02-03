import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from 'src/components/protectedRoutes/protectedRoute';
import Loadable from '../layouts/full/shared/loadable/Loadable';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Dashboard Super Admin***** */
const DashboardAdmin = Loadable(lazy(() => import('../views/dashboard/Admin')));

// Status Kerja Sama
const StatusKerjaSamaList = Loadable(lazy(() => import('../views/apps/super-admin/status-kerja-sama/StatusKerjaSamaList')));
const StatusKerjaSamaAdd = Loadable(lazy(() => import('../views/apps/super-admin/status-kerja-sama/StatusKerjaSamaAdd')));
const StatusKerjaSamaEdit = Loadable(lazy(() => import('../views/apps/super-admin/status-kerja-sama/StatusKerjaSamaEdit')));
// Pendaftaran Sekolah
const PendaftaranSekolahList = Loadable(lazy(() => import('../views/apps/super-admin/pendaftaran-sekolah/PendaftaranSekolahList')));
const PendaftaranSekolahAdd = Loadable(lazy(() => import('../views/apps/super-admin/pendaftaran-sekolah/PendaftaranSekolahAdd')));
const PendaftaranSekolahEdit = Loadable(lazy(() => import('../views/apps/super-admin/pendaftaran-sekolah/PendaftaranSekolahEdit')));
// Data Admin Sekolah
const AdminSekolahList = Loadable(lazy(() => import('../views/apps/super-admin/admin-sekolah/AdminSekolahList')));
const AdminSekolahAdd = Loadable(lazy(() => import('../views/apps/super-admin/admin-sekolah/AdminSekolahAdd')));

/* ****Dashboard Admin Sekolah***** */
const DashboardAdminSekolah = Loadable(lazy(() => import('../views/dashboard/AdminSekolah')));
// Kategori Pegawai
const KategoriPegawaiList = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/KategoriPegawaiList')));
const KategoriPegawaiAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/KategoriPegawaiAdd')));
const KategoriPegawaiEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/KategoriPegawaiEdit')));
const KategoriPegawaiDetail = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/KategoriPegawaiDetail')));
const KategoriPegawaiDetailAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/kategoriPegawaiDetailAdd')));
const KategoriPegawaiDetailEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-pegawai/KategoriPegawaiDetailEdit')));
// Data Pegawai Guru
const PegawaiGuruList = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-guru/PegawaiGuruList')));
const PegawaiGuruAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-guru/PegawaiGuruAdd')));
const PegawaiGuruEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-guru/PegawaiGuruEdit')));
// Data Pegawai Staf
const PegawaiStafList = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-staf/PegawaiStafList')));
const PegawaiStafAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-staf/PegawaiStafAdd')));
const PegawaiStafEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-staf/PegawaiStafEdit')));
// Mata Pelajaran
const MataPelajaranList = Loadable(lazy(() => import('../views/apps/admin-sekolah/mata-pelajaran/MataPelajaranList')));
const MataPelajaranAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/mata-pelajaran/MataPelajaranAdd')));
const MataPelajaranEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/mata-pelajaran/MataPelajaranEdit')));
// Tingkatan Kelas
const TingkatList = Loadable(lazy(() => import('../views/apps/admin-sekolah/tingkat/TingkatList')));
const TingkatAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/tingkat/TingkatAdd')));
const TingkatEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/tingkat/TingkatEdit')));
// Kelas
const KelasList = Loadable(lazy(() => import('../views/apps/admin-sekolah/kelas/KelasList')));
const KelasAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/kelas/KelasAdd')));
const KelasEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/kelas/KelasEdit')));
// Wali Kelas
const WaliKelasList = Loadable(lazy(() => import('../views/apps/admin-sekolah/wali-kelas/WaliKelasList')));
const WaliKelasAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/wali-kelas/WaliKelasAdd')));
const WaliKelasEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/wali-kelas/WaliKelasEdit')));
// Guru Mata Pelajaran
const GuruMapelList = Loadable(lazy(() => import('../views/apps/admin-sekolah/guru-mapel/GuruMapelList')));
const GuruMapelAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/guru-mapel/GuruMapelAdd')));
const GuruMapelEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/guru-mapel/GuruMapelEdit')));
// Hari
const HariList = Loadable(lazy(() => import('../views/apps/admin-sekolah/hari/HariList')));
const HariAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/hari/HariAdd')));
const HariEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/hari/HariEdit')));
// Waktu/Jam
const WaktuList = Loadable(lazy(() => import('../views/apps/admin-sekolah/waktu/WaktuList')));
const WaktuAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/waktu/WaktuAdd')));
const WaktuEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/waktu/WaktuEdit')));
const CloneWaktu = Loadable(lazy(() => import('../views/apps/admin-sekolah/waktu/CloneWaktu')));
// Kategori Waktu
const KategoriWaktuList = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-waktu/KategoriWaktuList')));
const KategoriWaktuAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-waktu/KategoriWaktuAdd')));
const KategoriWaktuEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/kategori-waktu/KategoriWaktuEdit')));
// Jadwal Mapel
const JadwalMapelList = Loadable(lazy(() => import('../views/apps/admin-sekolah/jadwal-mapel/JadwalMapelList')));
const JadwalMapelAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/jadwal-mapel/JadwalMapelAdd')));
// User Guru
const UserGuruList = Loadable(lazy(() => import('../views/apps/admin-sekolah/user-guru/UserGuruList')));

// User Staf
const UserStafList = Loadable(lazy(() => import('../views/apps/admin-sekolah/user-staf/UserStafList')));

// User Siswa
const UserSiswaList = Loadable(lazy(() => import('../views/apps/admin-sekolah/user-siswa/UserSiswaList')));

// User Admin
const UserAdminList = Loadable(lazy(() => import('../views/apps/admin-sekolah/user-admin/UserAdminList')));
const UserAdminAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/user-admin/UserAdminAdd')));
// Data Siswa
const SiswaList = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-siswa/SiswaList')));
const SiswaEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-siswa/SiswaEdit')));
const SiswaAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/data-siswa/SiswaAdd')));
// Status kehadiran
const StatusKehadiranList = Loadable(lazy(() => import('../views/apps/admin-sekolah/status-kehadiran/StatusKehadiranList')));
const StatusKehadiranAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/status-kehadiran/StatusKehadiranAdd')));
const StatusKehadiranEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/status-kehadiran/StatusKehadiranEdit')));
// QR Code
const QrCodeGenerateList = Loadable(lazy(() => import('../views/apps/admin-sekolah/qr-codes/QrCodeGeneratelist')));

// Absensi
const QrCodeScanView = Loadable(lazy(() => import('../views/apps/admin-sekolah/absensi/QrCodeScanView')));
const AbsensiList = Loadable(lazy(() => import('../views/apps/admin-sekolah/absensi/AbsensiList')));
const AbsensiAdd = Loadable(lazy(() => import('../views/apps/admin-sekolah/absensi/AbsensiAdd')));
// Rekap Absensi
const RekapAbsensiList = Loadable(lazy(() => import('../views/apps/admin-sekolah/rekap-absensi/RekapAbsensiList')));

// Pengaturan Jam
const PengaturanJamList = Loadable(lazy(() => import('../views/apps/admin-sekolah/pengaturan-jam/PengaturanJamList')));
const PengaturanJamEdit = Loadable(lazy(() => import('../views/apps/admin-sekolah/pengaturan-jam/PengaturanJamEdit')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const RegisterSchool = Loadable(lazy(() => import('../views/authentication/auth1/RegisterSchool')));
const RegisterParents = Loadable(lazy(() => import('../views/authentication/auth1/RegisterParents')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const InternalError = Loadable(lazy(() => import('../views/authentication/500Error')));
const Forbidden = Loadable(lazy(() => import('../views/authentication/Forbidden')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage

const Router = [
  {
    path: '/',
    element: <BlankLayout />, 
    children: [
      { path: '/', element: <Login /> },
      { path: '/auth/404', element: <Error /> },
      // { path: '/auth/login', element: <Login /> },
      { path: '/auth/register/student', element: <Register /> },
      { path: '/auth/register/school', element: <RegisterSchool /> },
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
        element: <ProtectedRoute allowedRoles={['super admin']} />,
        children: [
          { path: '', element: <DashboardAdmin /> },
            // Status Kerja Sama
          { path: 'status', element: <StatusKerjaSamaList /> },
          { path: 'status/tambah-status', element: <StatusKerjaSamaAdd /> },
          { path: 'status/edit/:id', element: <StatusKerjaSamaEdit /> },
            // Pendaftaran Sekolah
          { path: 'manajemen-sekolah/pendaftaran-sekolah', element: <PendaftaranSekolahList /> },
          { path: 'manajemen-sekolah/pendaftaran/edit/:id', element: <PendaftaranSekolahEdit /> },
          { path: 'manajemen-sekolah/pendaftaran/tambah', element: <PendaftaranSekolahAdd /> },
            // Admin Sekolah
          { path: 'manajemen-sekolah/admin-sekolah', element: <AdminSekolahList /> },
          { path: 'manajemen-sekolah/tambah-admin/:sekolah_id', element: <AdminSekolahAdd /> },
            
        ],
      },
      {
        path: 'dashboard/admin-sekolah',
        element: <ProtectedRoute allowedRoles={['admin sekolah']} />,
        children: [
          { path: '', element: <DashboardAdminSekolah /> },
            // Kategori Pegawai
          { path: 'kategori-pegawai', element: <KategoriPegawaiList /> },
          { path: 'kategori-pegawai/tambah-kategori', element: <KategoriPegawaiAdd /> },
          { path: 'kategori-pegawai/edit/:id', element: <KategoriPegawaiEdit/> },
          { path: 'kategori-pegawai/detail/:id', element: <KategoriPegawaiDetail/> },
          { path: 'kategori-pegawai/:id/tambah-sub-kategori', element: <KategoriPegawaiDetailAdd/> },
          { path: 'kategori-pegawai/:id/edit-sub-kategori/:subKategoriId', element: <KategoriPegawaiDetailEdit/> },
          // Data Guru
          { path: 'pegawai/guru', element: <PegawaiGuruList /> },
          { path: 'pegawai/guru/tambah-guru', element: <PegawaiGuruAdd /> },
          { path: 'pegawai/guru/edit/:id', element: <PegawaiGuruEdit /> },
          // Data Staf
          { path: 'pegawai/staf', element: <PegawaiStafList /> },
          { path: 'pegawai/staf/tambah-staf', element: <PegawaiStafAdd /> },
          { path: 'pegawai/staf/edit/:id', element: <PegawaiStafEdit /> },
          // Mata Pelajaran
          { path: 'mata-pelajaran', element: <MataPelajaranList/> },
          { path: 'mata-pelajaran/tambah-mapel', element: <MataPelajaranAdd/> },
          { path: 'mata-pelajaran/edit/:id', element: <MataPelajaranEdit/> },
          // Tingkat Kelas
          { path: 'tingkat', element: <TingkatList/> },
          { path: 'tingkat/tambah-tingkat', element: <TingkatAdd/> },
          { path: 'tingkat/edit/:id', element: <TingkatEdit/> },
          // Kelas
          { path: 'kelas', element: <KelasList/> },
          { path: 'kelas/tambah-kelas', element: <KelasAdd/> },
          { path: 'kelas/edit/:id', element: <KelasEdit/> },
          // Wali Kelas
          { path: 'wali-kelas', element: <WaliKelasList/> },
          { path: 'wali-kelas/tambah-wali-kelas', element: <WaliKelasAdd/> },
          { path: 'wali-kelas/edit/:id', element: <WaliKelasEdit/> },
          // Guru Mata Pelajaran
          { path: 'guru-mapel', element: <GuruMapelList/> },
          { path: 'guru-mapel/tambah-guru-mapel', element: <GuruMapelAdd/> },
          { path: 'guru-mapel/edit/:id', element: <GuruMapelEdit/> },
          // Hari
          { path: 'hari', element: <HariList/> },
          { path: 'hari/tambah-hari', element: <HariAdd/> },
          { path: 'hari/edit/:id', element: <HariEdit/> },
          // Waktu/Jam
          { path: 'waktu', element: <WaktuList/> },
          { path: 'waktu/tambah-waktu', element: <WaktuAdd/> },
          { path: 'waktu/tambah-clone', element: <CloneWaktu/> },
          { path: 'waktu/edit/:id', element: <WaktuEdit/> },
          // Kategori Waktu
          { path: 'kategori-waktu', element: <KategoriWaktuList/> },
          { path: 'kategori-waktu/tambah-kategori', element: <KategoriWaktuAdd/> },
          { path: 'kategori-waktu/edit/:id', element: <KategoriWaktuEdit/> },
          // Jadwal Mapel
          { path: 'jadwal-mapel', element: <JadwalMapelList/> },
          { path: 'jadwal-mapel/tambah-jadwal', element: <JadwalMapelAdd/> },
          // User Admin
          { path: 'user-admin', element: <UserAdminList/> },
          { path: 'user-admin/tambah', element: <UserAdminAdd/> },
          // User Guru
          { path: 'user-guru', element: <UserGuruList/> },
          // User Staf
          { path: 'user-staf', element: <UserStafList/> },
          // User Siswa
          { path: 'user-siswa', element: <UserSiswaList/> },
          // Siswa
          { path: 'siswa', element: <SiswaList/> },
          { path: 'siswa/edit/:id', element: <SiswaEdit/> },
          { path: 'siswa/tambah', element: <SiswaAdd/> },
          // Status Kehadiran
          { path: 'status-kehadiran', element: <StatusKehadiranList/> }, 
          { path: 'status-kehadiran/tambah', element: <StatusKehadiranAdd/> }, 
          { path: 'status-kehadiran/edit/:id', element: <StatusKehadiranEdit/> },
          // Generate QR Code
          { path: 'generate-student-card', element: <QrCodeGenerateList/> }, 
          // Absensi
          { path: 'absensi', element: <QrCodeScanView/> },
          { path: 'absensi-siswa', element: <AbsensiList/> },
          { path: 'absensi-siswa/tambah', element: <AbsensiAdd/> },   
          // Rekap Absensi
          { path: 'rekap-absensi', element: <RekapAbsensiList/> }, 

          // Pengaturan Jam
          { path: 'pengaturan-jam', element: <PengaturanJamList/> },
          { path: 'pengaturan-jam/edit/:id', element: <PengaturanJamEdit/> },
          
        ],
      },
    ],
  },
];

export default Router;