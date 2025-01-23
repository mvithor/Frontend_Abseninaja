import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin-sekolah/kategori-pegawai',
    title: 'Kategori Pegawai',
  },
  {
    title: 'Tambah Kategori Pegawai',
  },
];

const BcKategoriPegawaiAdd = () => (
  <Breadcrumb title="Tambah Kategori Pegawai" items={BCrumb} />
);

export default BcKategoriPegawaiAdd;
