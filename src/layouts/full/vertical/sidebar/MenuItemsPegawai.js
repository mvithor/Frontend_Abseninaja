import {
    IconScan,
    IconDashboard,
  } from '@tabler/icons';
  
  
  import { uniqueId } from 'lodash';
  
  const MenuitemsPegawai = [
    {
        navlabel: true,
        subheader: 'Dashboard Pegawai',
    },
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconDashboard,
      href: '/dashboard/pegawai',
      chipColor: 'secondary'
    },
    {
        id: uniqueId(),
        title: 'Scan QR-Code',
        icon: IconScan,
        href: '/dashboard/pegawai/scan',
        chipColor: 'secondary'
      },
]
  
  export default MenuitemsPegawai;
  