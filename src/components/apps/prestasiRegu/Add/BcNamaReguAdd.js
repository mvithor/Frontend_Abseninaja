import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Nama Tim',
  },
];

const BcNamaReguAdd = () => (
  <Breadcrumb title="Tambah Data Nama Tim" items={BCrumb} />
);

export default BcNamaReguAdd;
