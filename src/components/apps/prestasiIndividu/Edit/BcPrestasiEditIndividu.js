import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Form Edit Prestasi Individu',
  },
];

const BcPrestasiEditIndividu = () => (
  <Breadcrumb title="Form Edit Prestasi individu" items={BCrumb} />
);

export default BcPrestasiEditIndividu;