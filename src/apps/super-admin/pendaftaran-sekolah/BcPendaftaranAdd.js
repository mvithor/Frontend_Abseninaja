import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Pendaftaran',
  },
];

const BcPendaftaranAdd = () => (
  <Breadcrumb title="Tambah Data Pendaftaran" items={BCrumb} />
);

export default BcPendaftaranAdd;
