import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Form Edit Nama Tim',
  },
];

const BcNamaReguEdit = () => (
  <Breadcrumb title="Form Edit Nama Tim" items={BCrumb} />
);

export default BcNamaReguEdit;
