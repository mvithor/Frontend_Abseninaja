import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Admin Sekolah',
  },
];

const BcAdminSekolahList = () => (
  <Breadcrumb title="Admin Sekolah" items={BCrumb} />
);

export default BcAdminSekolahList;
