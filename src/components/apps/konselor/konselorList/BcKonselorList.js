import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Konselor',
  },
];

const BcKonselorList = () => (
  <Breadcrumb title="Data Siswa" items={BCrumb} />
);

export default BcKonselorList;
