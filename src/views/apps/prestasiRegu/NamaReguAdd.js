import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcNamaReguAdd from "src/components/apps/prestasiRegu/Add/BcNamaReguAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahNamaReguForm from "src/components/apps/prestasiRegu/Add/TambahNamaReguForm";

const NamaReguAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Nama Tim">
            <BcNamaReguAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Nama Tim">
                <TambahNamaReguForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default NamaReguAdd;