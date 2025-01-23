import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/admin-sekolah',
    title: 'Admin Sekolah',
  },
  {
    title: 'Tambah Admin Sekolah',
  },
];

const BcAdminSekolahAdd = () => (
  <Breadcrumb title="Tambah Admin Sekolah" items={BCrumb} />
);

export default BcAdminSekolahAdd;
