import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard',
    title: 'Dashboard',
  },
  {
    title: 'Form Edit Pelanggaran',
  },
];

const BreadcrumbPelanggaranEdit = () => (
  <Breadcrumb title="Form Edit Pelanggaran" items={BCrumb} />
);

export default BreadcrumbPelanggaranEdit;
