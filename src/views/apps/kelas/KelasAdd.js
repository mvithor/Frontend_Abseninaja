import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BreadcrumbAddKelas from "src/components/apps/kelas/kelasAdd/BreadcrumbAddKelas";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahKelasForm from "src/components/apps/kelas/kelasAdd/TambahKelasForm";

const KelasAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Tambah Kelas" description="Tambah Kelas">
          <BreadcrumbAddKelas />
          <Alerts error={error} success={success}/>
          <ParentCard title="Form Tambah Kelas">
            <TambahKelasForm setSuccess={setSuccess} setError={setError} />
          </ParentCard>
        </PageContainer>
    );
};

export default KelasAdd;
