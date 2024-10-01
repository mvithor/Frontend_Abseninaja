import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Status Keluarga',
  },
];

const BcStatusKeluargaList = () => (
  <Breadcrumb title="Status Keluarga" items={BCrumb} />
);

export default BcStatusKeluargaList;
