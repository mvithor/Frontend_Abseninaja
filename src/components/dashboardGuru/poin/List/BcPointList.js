import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/guru',
    title: 'Dashboard',
  },
  {
    title: 'Data Poin Siswa',
  },
];

const BcPoinList = () => (
  <Breadcrumb title="Data Poin Siswa" items={BCrumb} />
);

export default BcPoinList;
