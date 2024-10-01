import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/bidang-bimbingan',
    title: 'Bidang Bimbingan',
  },
  {
    title: 'Edit Bidang Bimbingan',
  },
];

const BcBimbinganEdit = () => (
  <Breadcrumb title="Edit Bidang Bimbingan" items={BCrumb} />
);

export default BcBimbinganEdit;
