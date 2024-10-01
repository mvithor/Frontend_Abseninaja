import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/prestasi/regu',
    title: 'Data Prestasi Tim',
  },
  {
    title: 'Edit Data Prestasi Tim Siswa',
  },
];

const BcEditDetaiPrestasilRegu = () => (
  <Breadcrumb title="Edit Data Prestasi Tim" items={BCrumb} />
);

export default BcEditDetaiPrestasilRegu;
