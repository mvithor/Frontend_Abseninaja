import {
    IconAward,
    IconDashboard,
    IconBuilding
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsGuru = [
    {
        navlabel: true,
        subheader: 'Dashboard Guru',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/guru',
      chipColor: 'secondary'
    },
    {
      id: uniqueId(),
      title: 'Kelas Saya',
      icon: IconBuilding,
      href: '/dashboard/guru/kelas-saya'
    },
    {
        id: uniqueId(),
        title: 'Poin',
        icon: IconAward,
        href: '/dashboard/guru/poin'
    },

  ];
  
  export default MenuitemsGuru;
  