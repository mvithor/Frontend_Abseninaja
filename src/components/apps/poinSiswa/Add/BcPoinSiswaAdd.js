import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/poin',
    title: 'Data Poin Siswa',
  },
  {
    title: 'Tambah Poin Siswa',
  },
];

const BcPoinSiswaAdd = () => (
  <Breadcrumb title="Tambah Poin Siswa" items={BCrumb} />
);

export default BcPoinSiswaAdd;
