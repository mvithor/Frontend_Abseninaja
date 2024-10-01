import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/status-keluarga',
    title: 'Status Keluarga',
  },
  {
    title: 'Tambah Status Keluarga',
  },
];

const BcStatusKeluargaAdd = () => (
  <Breadcrumb title="Tambah Status Keluarga" items={BCrumb} />
);

export default BcStatusKeluargaAdd;
