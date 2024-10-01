import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Siswa',
  },
];

const BcSiswaList = () => (
  <Breadcrumb title="Data Siswa" items={BCrumb} />
);

export default BcSiswaList;
