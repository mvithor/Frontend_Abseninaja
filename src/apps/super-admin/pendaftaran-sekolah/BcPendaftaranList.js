import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin',
    title: 'Dashboard',
  },
  {
    title: 'Pendaftaran Sekolah',
  },
];

const BcPendaftaranList = () => (
  <Breadcrumb title="Data Pendaftaran Sekolah" items={BCrumb} />
);

export default BcPendaftaranList;
