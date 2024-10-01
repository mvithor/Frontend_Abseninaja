import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Form Edit Siswa',
  },
];

const BreadcrumbSiswaEdit = () => (
  <Breadcrumb title="Form Edit Siswa" items={BCrumb} />
);

export default BreadcrumbSiswaEdit;
