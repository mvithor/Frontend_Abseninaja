import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Tambah Data Prestasi Individu',
  },
];

const BcAddPrestasiIndividu = () => (
  <Breadcrumb title="Tambah Data Prestasi Individu" items={BCrumb} />
);

export default BcAddPrestasiIndividu;
