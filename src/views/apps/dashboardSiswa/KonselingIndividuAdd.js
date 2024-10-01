import React, { useState } from "react";
import BcKonselingIndividuAdd from "src/components/dashboardSiswa/KonselingIndividu/BcKonselingIndividuAdd";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahKonselingIndividuForm from "src/components/dashboardSiswa/KonselingIndividu/KonselingIndividuForm";

const KonselingIndividuAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Form Konseling Individu" description="Form Konseling Individu">
            <BcKonselingIndividuAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Konseling Individu">
                <TambahKonselingIndividuForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default KonselingIndividuAdd;