import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tiket Konsultasi',
  },
];

const BcTiketKonsultasi = () => (
  <Breadcrumb title="Data Pengajuan Konsultasi" items={BCrumb} />
);

export default BcTiketKonsultasi;
