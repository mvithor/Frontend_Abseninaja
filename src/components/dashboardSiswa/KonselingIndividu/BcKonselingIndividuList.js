import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/siswa',
    title: 'Dashboard',
  },
  {
    title: 'Data Konseling Individu',
  },
];

const BcKonselingIndividuList = () => (
  <Breadcrumb title="Konseling Individu" items={BCrumb} />
);

export default BcKonselingIndividuList;
