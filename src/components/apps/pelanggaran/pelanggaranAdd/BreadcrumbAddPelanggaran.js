import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Pelanggaran',
  },
];

const BreadcrumbAddPelanggaran = () => (
  <Breadcrumb title="Tambah Data Pelanggaran" items={BCrumb} />
);

export default BreadcrumbAddPelanggaran;
