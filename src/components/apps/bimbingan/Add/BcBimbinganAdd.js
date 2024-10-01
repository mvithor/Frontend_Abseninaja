import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/bidang-bimbingan',
    title: 'Bidang Bimbingan',
  },
  {
    title: 'Tambah Bidang Bimbingan',
  },
];

const BcBimbinganAdd = () => (
  <Breadcrumb title="Tambah Bidang Bimbingan" items={BCrumb} />
);

export default BcBimbinganAdd;
