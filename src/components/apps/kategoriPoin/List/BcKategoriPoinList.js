import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Kategori Poin',
  },
];

const BcKategoriPoinList = () => (
  <Breadcrumb title="Kategori Poin" items={BCrumb} />
);

export default BcKategoriPoinList;
