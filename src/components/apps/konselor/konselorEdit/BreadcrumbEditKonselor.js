import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Edit Data Konselor',
  },
];

const BreadcrumbEditKonselor = () => (
  <Breadcrumb title="Edit Data Konselor" items={BCrumb} />
);

export default BreadcrumbEditKonselor;
