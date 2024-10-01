import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Wali Kelas',
  },
];

const BcAddWaliKelas = () => (
  <Breadcrumb title="Tambah Data Wali Kelas" items={BCrumb} />
);

export default BcAddWaliKelas;
