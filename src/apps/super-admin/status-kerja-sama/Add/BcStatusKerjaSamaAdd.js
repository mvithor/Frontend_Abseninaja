import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/status',
    title: 'Status Kerja Sama',
  },
  {
    title: 'Tambah Status Kerja Sama',
  },
];

const BcStatusKerjaSamaAdd = () => (
  <Breadcrumb title="Tambah Status Keluarga" items={BCrumb} />
);

export default BcStatusKerjaSamaAdd;
