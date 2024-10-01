import React, { useState } from "react";
import Alerts from "src/components/apps/siswa/siswaEdit/Alerts";
import BreadcrumbAddKonselor from "src/components/apps/konselor/BreadcrumbAddKonselor";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahKonselor from "src/components/apps/konselor/TambahKonselor";

const KonselorAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer>
          <BreadcrumbAddKonselor />
          {success && <Alerts success={success} />}
          {error && <Alerts error={error} />}
          <ParentCard title="Form Tambah Konselor">
            <TambahKonselor setSuccess={setSuccess} setError={setError} />
          </ParentCard>
        </PageContainer>
    );
};

export default KonselorAdd;
