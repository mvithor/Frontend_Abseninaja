import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Pengguna',
  },
];

const BcUsersList = () => (
  <Breadcrumb title="Data Pengguna" items={BCrumb} />
);

export default BcUsersList;
