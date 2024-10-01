import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tiket Konseling',
  },
];

const BcTiketKonseling = () => (
  <Breadcrumb title="Data Pengajuan Konseling" items={BCrumb} />
);

export default BcTiketKonseling;
