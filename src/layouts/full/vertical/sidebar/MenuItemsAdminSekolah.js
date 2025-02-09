import {
    IconBook2, IconBriefcase, IconBuilding, IconQrcode, 
    IconScan, IconCalendarTime, IconPhotoDown,
    IconFiles, IconSchool, IconWallet, IconBrandWhatsapp,
    IconDashboard, IconSettings, IconDownload, IconUsers,
    IconClock, IconMapPin, IconClipboard, IconCategory, 
    IconCalendarEvent, IconChartBar, IconUser, IconBuildingArch,
    IconBooks, IconCategory2, IconCalendar, IconBell, IconCoin,
    IconFileInvoice, IconCreditCard, IconPoint, IconClipboardText,
    IconMessage
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsAdminSekolah = [
    {
        navlabel: true,
        subheader: 'Dashboard Admin Sekolah',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/admin-sekolah',
      chipColor: 'secondary'
    },
    {
        id: uniqueId(),
        title: 'Absensi',
        icon: IconCalendarTime,
        href: '/dashboard/admin-sekolah/absensi-siswa'
    },
    {
        id: uniqueId(),
        title: 'Siswa',
        icon: IconSchool,
        href: '/dashboard/admin-sekolah/siswa'
    },
    {
        id: uniqueId(),
        title: 'Pesan',
        icon: IconMessage,
        href: '#'
    },
    {
        id: uniqueId(),
        title: 'Manajemen Absensi',
        icon: IconQrcode,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Scan QR-Code',
                icon: IconScan,
                href: '/dashboard/admin-sekolah/absensi',
            },
            {
                id: uniqueId(),
                title: 'Download Kartu Pelajar',
                icon: IconPhotoDown,
                href: '/dashboard/admin-sekolah/generate-student-card',
            },
            {
                id: uniqueId(),
                title: 'Pengaturan Jam',
                icon: IconClock,
                href: '/dashboard/admin-sekolah/pengaturan-jam',
            },
            {
                id: uniqueId(),
                title: 'Status Kehadiran',
                icon: IconMapPin,
                href: '/dashboard/admin-sekolah/status-kehadiran',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Pegawai',
        icon: IconBriefcase,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Data Guru',
                icon: IconClipboard,
                href: '/dashboard/admin-sekolah/pegawai/guru',
            },
            {
                id: uniqueId(),
                title: 'Data Staff',
                icon: IconClipboard,
                href: '/dashboard/admin-sekolah/pegawai/staf',
            },
            {
                id: uniqueId(),
                title: 'Kategori Pegawai',
                icon: IconCategory,
                href: '/dashboard/admin-sekolah/kategori-pegawai',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Kelas',
        icon: IconBuilding,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Data Kelas',
                icon: IconBuildingArch,
                href: '/dashboard/admin-sekolah/kelas',
            },
            {
                id: uniqueId(),
                title: 'Wali Kelas',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/wali-kelas',
            },
            {
                id: uniqueId(),
                title: 'Tingkat Kelas',
                icon: IconChartBar,
                href: '/dashboard/admin-sekolah/tingkat',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Mapel',
        icon: IconBook2,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Data Mata Pelajaran',
                icon: IconBooks,
                href: '/dashboard/admin-sekolah/mata-pelajaran',
            },
            {
                id: uniqueId(),
                title: 'Guru Mata Pelajaran',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/guru-mapel',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Jadwal',
        icon: IconFiles,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Jadwal Mata Pelajaran',
                icon: IconCalendar,
                // href: '/dashboard/admin-sekolah/jadwal-mapel',
            },
            {
                id: uniqueId(),
                title: 'Jadwal Ekstrakurikuler',
                icon: IconCalendar,
                // href: '/dashboard/admin-sekolah/jadwal-ekskul',
            },
            {
                id: uniqueId(),
                title: 'Jadwal Kelas',
                icon: IconCalendarEvent,
                // href: '/dashboard/admin-sekolah/jadwal-Kelas',
            },
            {
                id: uniqueId(),
                title: 'Pengaturan',
                icon: IconSettings,
                href: '',
                children: [
                    {
                        id: uniqueId(),
                        title: 'Hari',
                        icon: IconCalendarEvent,
                        // href: '/dashboard/admin-sekolah/hari',
                    },
                    {
                        id: uniqueId(),
                        title: 'Waktu',
                        icon: IconClock,
                        // href: '/dashboard/admin-sekolah/waktu',
                    },
                    {
                        id: uniqueId(),
                        title: 'Kategori Waktu',
                        icon: IconCategory2,
                        // href: '/dashboard/admin-sekolah/kategori-waktu',
                    },
                ],
            },
        ],
        
    },
    {
        id: uniqueId(),
        title: 'Manajemen Notifikasi',
        icon: IconBell,
        href: '#',
        children: [
            {
                id: uniqueId(),
                title: 'Absensi',
                icon: IconBrandWhatsapp,
                href: '#',
            },
            {
                id: uniqueId(),
                title: 'Tagihan dan Pembayaran',
                icon: IconFileInvoice,
                href: '#',
            },
            {
                id: uniqueId(),
                title: 'Saldo Siswa',
                icon: IconFileInvoice,
                href: '#',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Kartu',
        icon: IconCreditCard,
        href: '#',
        children: [
            {
                id: uniqueId(),
                title: 'Aktivasi Kartu',
                icon: IconPoint,
                href: '#',
            },
            {
                id: uniqueId(),
                title: 'Blokir Kartu',
                icon: IconPoint,
                href: '#',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Manajemen Keuangan',
        icon: IconCoin,
        href: '#',
        children: [
            {
                id: uniqueId(),
                title: 'Keuangan',
                icon: IconCoin,
                href: '#',
                children: [
                    {
                        id: uniqueId(),
                        title: 'Tagihan SPP',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Tagihan Non-SPP',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Kategori Biaya',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Riwayat Pembayaran',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Bukti Pembyaran',
                        icon: IconPoint,
                        href: '#',
                    },
                ],
            },
            {
                id: uniqueId(),
                title: 'Dompet Digital',
                icon: IconWallet,
                href: '#',
                children: [
                    {
                        id: uniqueId(),
                        title: 'Saldo Siswa',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Top-Up Saldo',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Limit Harian',
                        icon: IconPoint,
                        href: '#',
                    },
                    {
                        id: uniqueId(),
                        title: 'Transaksi Belanja',
                        icon: IconPoint,
                        href: '#',
                    },
                ],
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Download',
        icon: IconDownload,
        href: '/dashboard/admin-sekolah/rekap-absensi'
    },
    {
        id: uniqueId(),
        title: 'Manajemen Pengguna',
        icon: IconUsers,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Administrator',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/user-admin',
            },
            {
                id: uniqueId(),
                title: 'Guru',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/user-guru',
            },
            {
                id: uniqueId(),
                title: 'Staf',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/user-staf',
            },
            {
                id: uniqueId(),
                title: 'Siswa',
                icon: IconUser,
                href: '/dashboard/admin-sekolah/user-siswa',
            },
            {
                id: uniqueId(),
                title: 'Wali Siswa',
                icon: IconUser,
                // href: '/dashboard/admin-sekolah/user-wali-siswa',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Tentang Aplikasi',
        icon: IconClipboardText,
        href: '#'
    },
  ];
  
  export default MenuitemsAdminSekolah;
  