import {
    IconDashboard,
    IconNotebook,
    IconReceipt
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsWaliSiswa = [
    {
        navlabel: true,
        subheader: 'Dashboard Wali Siswa',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/wali-siswa',
      chipColor: 'secondary'
    },
    {
      id: uniqueId(),
      title: 'Konsultasi',
      icon: IconReceipt,
      href: '/dashboard/wali-siswa/konsultasi'
    },
    {
        id: uniqueId(),
        title: 'Catatan Konseling',
        icon: IconNotebook,
        href: '/dashboard/wali-siswa/catatan-konseling'
    },

  ];
  
  export default MenuitemsWaliSiswa;
  