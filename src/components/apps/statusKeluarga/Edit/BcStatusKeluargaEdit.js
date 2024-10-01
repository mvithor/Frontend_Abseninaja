import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/status-keluarga',
    title: 'Status Keluarga',
  },
  {
    title: 'Edit Status Keluarga',
  },
];

const BcStatusKeluargaEdit = () => (
  <Breadcrumb title="Edit Status Keluarga" items={BCrumb} />
);

export default BcStatusKeluargaEdit;
