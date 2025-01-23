import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/status',
    title: 'Status Kerja Sama',
  },
  {
    title: 'Edit Status Kerja Sama',
  },
];

const BcStatusKerjaSamaEdit = () => (
  <Breadcrumb title="Edit Status Kerja Sama" items={BCrumb} />
);

export default BcStatusKerjaSamaEdit;
