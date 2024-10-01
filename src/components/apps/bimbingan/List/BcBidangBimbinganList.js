import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Bidang Bimbingan',
  },
];

const BcBidangBimbinganList = () => (
  <Breadcrumb title="Bidang Bimbingan" items={BCrumb} />
);

export default BcBidangBimbinganList;
