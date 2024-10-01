import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Form Edit Prestasi Madrasah',
  },
];

const BcPrestasiEditMadrasah = () => (
  <Breadcrumb title="Form Edit Prestasi Madrasah" items={BCrumb} />
);

export default BcPrestasiEditMadrasah;
