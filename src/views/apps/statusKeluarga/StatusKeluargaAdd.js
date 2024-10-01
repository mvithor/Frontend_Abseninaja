import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKeluargaAdd from "src/components/apps/statusKeluarga/Add/BcStatusKeluargaAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahStatusKeluargaForm from "src/components/apps/statusKeluarga/Add/TambahStatusKeluargaForm";

const StatusKeluargaAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Status Keluarga" description="Tambah Status Keluarga">
            <BcStatusKeluargaAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Status Keluarga">
                <TambahStatusKeluargaForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default StatusKeluargaAdd;