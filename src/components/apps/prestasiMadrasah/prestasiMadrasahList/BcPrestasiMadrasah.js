import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Prestasi Madrasah',
  },
];

const BcPrestasiMadrasahList = () => (
  <Breadcrumb title="Data Prestasi Madrasah" items={BCrumb} />
);

export default BcPrestasiMadrasahList;
