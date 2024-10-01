import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/wali-siswa',
    title: 'Dashboard',
  },
  {
    title: 'Konsultasi',
  },
];

const BcKonsultasiList = () => (
  <Breadcrumb title="Konsultasi" items={BCrumb} />
);

export default BcKonsultasiList;
