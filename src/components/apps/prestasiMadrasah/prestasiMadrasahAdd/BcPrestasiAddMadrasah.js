import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Prestasi Madrasah',
  },
];

const BcAddPrestasiMadrasah = () => (
  <Breadcrumb title="Tambah Data Prestasi Madrasah" items={BCrumb} />
);

export default BcAddPrestasiMadrasah;
