import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/status',
    title: 'Data Pendaftaran Sekolah',
  },
  {
    title: 'Edit Pendaftaran',
  },
];

const BcPendaftaranEdit = () => (
  <Breadcrumb title="Edit Pendaftaran" items={BCrumb} />
);

export default BcPendaftaranEdit;
