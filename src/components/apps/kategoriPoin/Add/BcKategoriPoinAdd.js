import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/kategori-poin',
    title: 'Kategori Poin',
  },
  {
    title: 'Tambah Kategori Poin',
  },
];

const BcKategoriPoinAdd = () => (
  <Breadcrumb title="Tambah Kategori Poin" items={BCrumb} />
);

export default BcKategoriPoinAdd;
