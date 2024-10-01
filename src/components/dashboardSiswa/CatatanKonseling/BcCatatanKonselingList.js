import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/siswa',
    title: 'Dashboard',
  },
  {
    title: 'Catatan Konseling',
  },
];

const BcCatatanKonselingList = () => (
  <Breadcrumb title="Catatan Konseling" items={BCrumb} />
);

export default BcCatatanKonselingList;
