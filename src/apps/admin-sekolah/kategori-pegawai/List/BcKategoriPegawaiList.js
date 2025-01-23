import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin-sekolah',
    title: 'Dashboard',
  },
  {
    title: 'Admin Sekolah',
  },
];

const BcKategoriPegawaiList = () => (
  <Breadcrumb title="Kategori Pegawai" items={BCrumb} />
);

export default BcKategoriPegawaiList;
