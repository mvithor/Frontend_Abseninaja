import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Sekolah',
  },
];

const BcManajemenSekolahList = () => (
  <Breadcrumb title="Data Sekolah" items={BCrumb} />
);

export default BcManajemenSekolahList;
