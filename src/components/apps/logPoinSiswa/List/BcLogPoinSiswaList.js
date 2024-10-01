import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Log Poin Siswa',
  },
];

const BcLogPoinSiswaList = () => (
  <Breadcrumb title="Log Poin Siswa" items={BCrumb} />
);

export default BcLogPoinSiswaList;
