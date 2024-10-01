import {
  IconPoint,IconSchool,IconUser,IconAward,IconTrophy,
  IconCertificate2,IconUsers,IconBuilding,IconTargetArrow,IconNotebook,
  IconDashboard,IconSpeakerphone,IconHomeMove,IconMessage2,IconShield,
  IconHealthRecognition,IconMoodHappy,IconReceipt,IconClipboardText,IconTicket,
  IconSettings,IconReportAnalytics,IconMessage,IconShieldChevron,IconBriefcase,
  IconStars,IconUserCircle,IconServerCog,IconChartBar,IconHeart,
  IconHomeHeart,IconIdBadge2

} from '@tabler/icons';


import { uniqueId } from 'lodash';

const Menuitems = [
   {
    navlabel: true,
    subheader: 'Dashboard Admin',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/dashboard/admin',
    // chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Master Data',
    icon: IconBriefcase,
    href: '#',
    children: [
      {
        id: uniqueId(),
        title: 'Data Siswa',
        icon: IconUser,
        href: '/dashboard/admin/siswa',
      },
      {
        id: uniqueId(),
        title: 'Data Konselor',
        icon: IconUsers,
        href: '/dashboard/admin/konselor',
      },
      {
        id: uniqueId(),
        title: 'Data Wali Siswa',
        icon: IconHeart,
        href: '/dashboard/admin/status-keluarga',
        children: [
          {
            id: uniqueId(),
            title: 'Wali Siswa',
            icon: IconHomeHeart,
            href: '/dashboard/admin/wali-siswa',

          },
          {
            id: uniqueId(),
            title: 'Status Keluarga',
            icon: IconIdBadge2,
            href: '/dashboard/admin/status-keluarga',

          },
        ]
      },
      {
        id: uniqueId(),
        title: 'Data Wali Kelas',
        icon: IconShieldChevron,
        href: '/dashboard/admin/wali-kelas',
      },
      {
        id: uniqueId(),
        title: 'Data Kelas',
        icon: IconBuilding,
        href: '/dashboard/admin/kelas',
      },

      {
        id: uniqueId(),
        title: 'Data Poin',
        icon: IconStars,
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Poin Siswa',
            icon: IconChartBar,
            href: '/dashboard/admin/poin',

          },
          {
            id: uniqueId(),
            title: 'Kategori Poin',
            icon: IconStars,
            href: '/dashboard/admin/kategori-poin',

          },
          {
            id: uniqueId(),
            title: 'Log Poin Siswa',
            icon: IconServerCog,
            href: '/dashboard/admin/log-poin',

          }
        ]

      },
      {
        id: uniqueId(),
        title: 'Data Pelanggaran',
        icon: IconTargetArrow,
        href: '/dashboard/admin/pelanggaran'

      },
      {
        id: uniqueId(),
        title: 'Data Prestasi',
        icon: IconTrophy,
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Madrasah',
            icon: IconSchool,
            href: '/dashboard/admin/prestasi/madrasah',
          },
          {
            id: uniqueId(),
            title: 'Individu',
            icon: IconAward,
            href: '/dashboard/admin/prestasi/individu',
          },
          {
            id: uniqueId(),
            title: 'Regu',
            icon: IconCertificate2,
            href: '/dashboard/admin/prestasi/regu',
          }
        ]
      }
    ]
  },
  {
    navlabel: true,
    subheader: 'Layanan',
  },
  {
    id: uniqueId(),
    title: 'Konseling Individu',
    href: '#',
    icon: IconHealthRecognition,
    children: [
      {
        id: uniqueId(),
        title: 'Tiket Konseling Individu',
        icon: IconTicket,
        href: '/dashboard/admin/tiket-konseling-individu',
      },
      {
        id: uniqueId(),
        title: 'Bidang Bimbingan',
        icon: IconClipboardText,
        href: '/dashboard/admin/bidang-bimbingan',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Konseling Kelompok',
    icon: IconMoodHappy,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'Mediasi',
    icon: IconShield,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'Konsultasi',
    icon: IconReceipt,
    href: '/dashboard/admin/tiket-konsultasi',
    children: [
      {
        id: uniqueId(),
        title: 'Tiket Konsultasi',
        icon: IconTicket,
        href: '/dashboard/admin/tiket-konsultasi',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Catatan Anekdot',
    icon: IconNotebook,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'Konferensi Kasus',
    icon: IconSpeakerphone,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'Home Visit',
    icon: IconHomeMove,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'Referal',
    icon: IconMessage2,
    href: '#',
  },

  {
    navlabel: true,
    subheader: 'Rekapitulasi',
  },
  
      {
        id: uniqueId(),
        title: 'Konseling Individu',
        icon: IconReportAnalytics,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Konseling Kelompok',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Mediasi',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Konsultasi',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Catatan Anekdot',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Konferensi Kasus',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Home Visit',
        icon: IconPoint,
        href: '#',
      },
      {
        id: uniqueId(),
        title: 'Referal',
        icon: IconPoint,
        href: '#',
      },

  {
    navlabel: true,
    subheader: 'Manajemen Data',
  },
  {
    id: uniqueId(),
    title: 'Data Pengguna',
    icon: IconUserCircle,
    href: '/dashboard/admin/users',
  },



  {
    id: uniqueId(),
    title: 'Setting',
    icon: IconSettings,
    href: '#',
  },
  {
    id: uniqueId(),
    title: 'FAQ',
    icon: IconMessage,
    href: '#',
  },
];

export default Menuitems;
