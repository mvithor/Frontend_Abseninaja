import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Data Siswa Kelas',
  },
];

const BreadcrumbKelasDetail = () => (
  <Breadcrumb title="Detail Kelas" items={BCrumb} />
);

export default BreadcrumbKelasDetail;
