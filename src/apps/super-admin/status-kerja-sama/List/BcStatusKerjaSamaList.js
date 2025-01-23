import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Status Kerja Sama',
  },
];

const BcStatusKerjaSamaList = () => (
  <Breadcrumb title="Status Kerja Sama" items={BCrumb} />
);

export default BcStatusKerjaSamaList;
