import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Setting',
  },
];

const BcPoinSiswaList = () => (
  <Breadcrumb title="Setting" items={BCrumb} />
);

export default BcPoinSiswaList;
