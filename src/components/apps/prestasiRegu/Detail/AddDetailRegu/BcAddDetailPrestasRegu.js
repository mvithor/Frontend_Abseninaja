import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard/admin/prestasi/regu',
    title: 'Data Prestasi Tim',
  },
  {
    title: 'Tambah Data Prestasi Tim Siswa',
  },
];

const BcAddDetaiPrestasilRegu = () => (
  <Breadcrumb title="Tambah Data Prestasi Tim" items={BCrumb} />
);

export default BcAddDetaiPrestasilRegu;
