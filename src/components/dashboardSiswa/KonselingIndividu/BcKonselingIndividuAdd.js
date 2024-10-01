import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/siswa/konseling-individu',
    title: 'Konseling Individu',
  },
  {
    title: 'Tambah Konseling Individu',
  },
];

const BcKonselingIndividuAdd = () => (
  <Breadcrumb title="Tambah Konseling Individu" items={BCrumb} />
);

export default BcKonselingIndividuAdd;
