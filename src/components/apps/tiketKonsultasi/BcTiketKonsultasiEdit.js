import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/tiket-konsultasi',
    title: 'Data Pengajuan Konsultasi',
  },
  {
    title: 'Edit Konsultasi',
  },
];

const BcTiketKonsultasiEdit = () => (
  <Breadcrumb title="Edit Konsultasi" items={BCrumb} />
);

export default BcTiketKonsultasiEdit;
