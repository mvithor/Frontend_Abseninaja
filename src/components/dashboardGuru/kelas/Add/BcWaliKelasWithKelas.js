import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/guru',
    title: 'Dashboard',
  },
  {
    title: 'Data Kelas',
  },
];

const BcWaliKelasWithKelas = () => (
  <Breadcrumb title="Data Kelas" items={BCrumb} />
);

export default BcWaliKelasWithKelas;
