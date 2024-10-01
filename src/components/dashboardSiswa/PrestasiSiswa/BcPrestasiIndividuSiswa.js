import React from "react";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const BCrumb = [
    {
      to: '/dashboard/siswa',
      title: 'Dashboard',
    },
    {
      title: 'Prestasi Saya',
    },
  ];

  const BcPrestasiIndividuSiswa = () => (
    <Breadcrumb title="Prestasi Saya" items={BCrumb}/>
  );

  export default BcPrestasiIndividuSiswa;