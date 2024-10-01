import React, { useState } from "react";
import Alerts from "src/components/apps/siswa/siswaEdit/Alerts";
import BreadcrumbAddPelanggaran from "src/components/apps/pelanggaran/pelanggaranAdd/BreadcrumbAddPelanggaran";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahPelanggaranForm from "src/components/apps/pelanggaran/pelanggaranAdd/TambahPelanggaranForm";

const PelanggaranAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer>
          <BreadcrumbAddPelanggaran />
          {success && <Alerts success={success} />}
          {error && <Alerts error={error} />}
          <ParentCard title="Form Tambah Pelanggaran">
            <TambahPelanggaranForm setSuccess={setSuccess} setError={setError} />
          </ParentCard>
        </PageContainer>
    );
};

export default PelanggaranAdd;
