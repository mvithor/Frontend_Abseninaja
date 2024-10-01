import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/wali-kelas',
    title: 'Data Wali Kelas',
  },
  {
    title: 'Edit Wali Kelas',
  },
];

const BcWaliKelasEdit = () => (
  <Breadcrumb title="Edit Wali Kelas" items={BCrumb} />
);

export default BcWaliKelasEdit;
