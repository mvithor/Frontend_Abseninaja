import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Wali Kelas',
  },
];

const BcWaliKelasList = () => (
  <Breadcrumb title="Data Wali Kelas" items={BCrumb} />
);

export default BcWaliKelasList;
