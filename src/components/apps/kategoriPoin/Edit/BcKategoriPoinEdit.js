import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/kategori-poin',
    title: 'Kategori Poin',
  },
  {
    title: 'Edit Kategori Poin',
  },
];

const BcKategoriPoinEdit = () => (
  <Breadcrumb title="Edit Kategori Poin" items={BCrumb} />
);

export default BcKategoriPoinEdit;
