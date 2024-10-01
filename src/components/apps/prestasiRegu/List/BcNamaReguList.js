import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Prestasi Tim',
  },
];

const BcNamaReguList = () => (
  <Breadcrumb title="Data Prestasi Tim" items={BCrumb} />
);

export default BcNamaReguList;
