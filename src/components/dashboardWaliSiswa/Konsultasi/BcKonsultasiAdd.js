import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/wali-siswa/konsultasi',
    title: 'Konsultasi Saya',
  },
  {
    title: 'Tambah Konsultasi',
  },
];

const BcKonsultasiAdd = () => (
  <Breadcrumb title="Tambah Konsultasi" items={BCrumb} />
);

export default BcKonsultasiAdd;
