import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcAddWaliKelas from "src/components/apps/waliKelas/Add/BcWaliKelasAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahWaliKelasForm from "src/components/apps/waliKelas/Add/TambahWaliKelas";

const WaliKelasAdd =() => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Tambah Wali Kelas" description="Tambah Wali Kelas">
            <BcAddWaliKelas/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Wali Kelas">
                <TambahWaliKelasForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default WaliKelasAdd;