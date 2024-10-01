import {
    IconTrophy,
    IconAward,
    IconNotebook,
    IconHealthRecognition,
    IconTargetArrow,
    IconDashboard,
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsSiswa = [
    {
        navlabel: true,
        subheader: 'Dashboard Siswa',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/siswa',
      chipColor: 'secondary'
    },
    {
        id: uniqueId(),
        title: 'Poin',
        icon: IconAward,
        href: '/dashboard/siswa/poin'
    },
    {
        id: uniqueId(),
        title: 'Prestasi',
        icon: IconTrophy,
        href: '/dashboard/siswa/prestasi'
    },
    {
        id: uniqueId(),
        title: 'Pelanggaran',
        icon: IconTargetArrow,
        href: '/dashboard/siswa/pelanggaran'
    },
    {
        id: uniqueId(),
        title: 'Layanan Konseling',
        icon: IconHealthRecognition,
        href: '/dashboard/siswa/konseling-individu'
    },
    {
        id: uniqueId(),
        title: 'Catatan Konseling',
        icon: IconNotebook,
        href: '/dashboard/siswa/catatan-konseling'
    },

  ];
  
  export default MenuitemsSiswa;
  