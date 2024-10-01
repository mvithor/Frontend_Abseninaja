import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Prestasi Individu',
  },
];

const BcPrestasiIndividuList = () => (
  <Breadcrumb title="Data Prestasi Individu" items={BCrumb} />
);

export default BcPrestasiIndividuList;
