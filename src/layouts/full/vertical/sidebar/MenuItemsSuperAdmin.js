import {
    IconTrophy,
    IconAward,
    IconHealthRecognition,
    IconTargetArrow,
    IconDashboard,
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsSuperAdmin = [
    {
        navlabel: true,
        subheader: 'Dashboard Admin',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/admin',
      chipColor: 'secondary'
    },
    {
        id: uniqueId(),
        title: 'Manajemen Sekolah',
        icon: IconAward,
        href: '',
        children: [
            {
                id: uniqueId(),
                title: 'Data Sekolah',
                icon: IconAward,
                href: '/dashboard/admin/manajemen-sekolah/data-sekolah',
            },
            {
                id: uniqueId(),
                title: 'Admin Sekolah',
                icon: IconAward,
                href: '/dashboard/admin/manajemen-sekolah/admin-sekolah',
            },
            {
                id: uniqueId(),
                title: 'Status Pendaftaran',
                icon: IconAward,
                href: '/dashboard/admin/manajemen-sekolah/pendaftaran-sekolah',
            },
            {
                id: uniqueId(),
                title: 'Tambah Pendaftaran Sekolah',
                icon: IconAward,
                href: '/dashboard/admin/manajemen-sekolah/pendaftaran/tambah',
            },
        ],
    },
    {
        id: uniqueId(),
        title: 'Pesan',
        icon: IconTrophy,
        href: '/dashboard/admin/pesan'
    },
    {
        id: uniqueId(),
        title: 'Pengajuan',
        icon: IconTargetArrow,
        href: '/dashboard/admin/pengajuan'
    },
    {
        id: uniqueId(),
        title: 'Status Kerja Sama',
        icon: IconTargetArrow,
        href: '/dashboard/admin/status'
    },
    {
        id: uniqueId(),
        title: 'Manajemen Pengguna',
        icon: IconHealthRecognition,
        href: '/dashboard/admin/manajemen-pengguna'
    },
  ];
  
  export default MenuitemsSuperAdmin;
  