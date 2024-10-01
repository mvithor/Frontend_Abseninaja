import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Rekap Konseling Individu',
  },
];

const BcRekapKonselingIndividuList = () => (
  <Breadcrumb title="Rekap Konseling Individu" items={BCrumb} />
);

export default BcRekapKonselingIndividuList;
