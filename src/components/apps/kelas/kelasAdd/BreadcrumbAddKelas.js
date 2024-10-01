import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Kelas',
  },
];

const BreadcrumbAddKelas = () => (
  <Breadcrumb title="Tambah Data Kelas" items={BCrumb} />
);

export default BreadcrumbAddKelas;
