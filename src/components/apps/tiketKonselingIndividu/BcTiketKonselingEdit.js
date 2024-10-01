import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/tiket-konseling-individu',
    title: 'Data Pengajuan Konseling',
  },
  {
    title: 'Edit Konseling',
  },
];

const BcTiketKonselingEdit = () => (
  <Breadcrumb title="Edit Konseling" items={BCrumb} />
);

export default BcTiketKonselingEdit;
