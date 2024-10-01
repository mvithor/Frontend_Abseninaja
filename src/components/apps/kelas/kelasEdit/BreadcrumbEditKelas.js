import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Edit Nama Kelas',
  },
];

const BreadcrumbKelasEdit = () => (
  <Breadcrumb title="Edit Nama Kelas" items={BCrumb} />
);

export default BreadcrumbKelasEdit;
