import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Poin Siswa',
  },
];

const BcPoinSiswaList = () => (
  <Breadcrumb title="Poin Siswa" items={BCrumb} />
);

export default BcPoinSiswaList;
