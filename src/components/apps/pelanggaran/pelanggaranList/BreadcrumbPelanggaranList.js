import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard',
    title: 'Dashboard',
  },
  {
    title: 'Data Pelanggaran',
  },
];

const BreadcrumbPelanggaran = () => (
  <Breadcrumb title="Data Pelanggaran" items={BCrumb} />
);

export default BreadcrumbPelanggaran;
