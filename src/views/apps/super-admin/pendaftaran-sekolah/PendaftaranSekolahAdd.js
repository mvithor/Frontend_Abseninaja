import { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcPendaftaranAdd from "src/apps/super-admin/pendaftaran-sekolah/BcPendaftaranAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import PendaftaranSekolahForm from "src/apps/super-admin/pendaftaran-sekolah/PendaftaranAdd";

const PendaftaranSekolahAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Pendaftaran Sekolah" description="Tambah Pendaftaran Sekolah">
            <BcPendaftaranAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Pendaftaran Sekolah">
                <PendaftaranSekolahForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default PendaftaranSekolahAdd;