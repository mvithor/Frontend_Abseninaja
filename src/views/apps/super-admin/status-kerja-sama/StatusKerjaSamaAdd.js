import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKerjaSamaAdd from "src/apps/super-admin/status-kerja-sama/Add/BcStatusKerjaSamaAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahStatusKerjaSamaForm from "src/apps/super-admin/status-kerja-sama/Add/StatusKerjaSamaForm";

const StatusKerjaSamaAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Status Kerja Sama" description="Tambah Status Kerja Sama">
            <BcStatusKerjaSamaAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Status Kerja Sama">
                <TambahStatusKerjaSamaForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default StatusKerjaSamaAdd;