import React, { useState } from "react";
import BcKonsultasiAdd from "src/components/dashboardWaliSiswa/Konsultasi/BcKonsultasiAdd";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahKonsultasiForm from "src/components/dashboardWaliSiswa/Konsultasi/KonsultasiForm";

const KonsultasiAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Form Konsultasi" description="Form Konsultasi">
            <BcKonsultasiAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Konseling Individu">
                <TambahKonsultasiForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default KonsultasiAdd;