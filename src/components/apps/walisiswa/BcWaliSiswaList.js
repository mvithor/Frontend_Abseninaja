import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Wali Siswa',
  },
];

const BcWaliSiswaList = () => (
  <Breadcrumb title="Data Wali Siswa" items={BCrumb} />
);

export default BcWaliSiswaList;
