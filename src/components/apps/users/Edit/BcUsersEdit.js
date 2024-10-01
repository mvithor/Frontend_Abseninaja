import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/users',
    title: 'Data Pengguna',
  },
  {
    title: 'Form Edit Pengguna',
  },
];

const BcUsersEdit = () => (
  <Breadcrumb title="Form Edit Pengguna" items={BCrumb} />
);

export default BcUsersEdit;