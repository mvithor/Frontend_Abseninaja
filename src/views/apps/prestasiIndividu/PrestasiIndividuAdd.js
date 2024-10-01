import React, { useState } from "react";
import BcAddPrestasiIndividu from "src/components/apps/prestasiIndividu/Add/BcPrestasiAddIndividu";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahPrestasiIndividuForm from "src/components/apps/prestasiIndividu/Add/TambahPrestasiIndividu";

const PrestasiAddIndividu = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Form Prestasi Individu" description="Form Prestasi Individu">
            <BcAddPrestasiIndividu/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Prestasi Individu">
                <TambahPrestasiIndividuForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiAddIndividu;