import { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CloneWaktuForm from "src/apps/admin-sekolah/waktu/Add/CloneWaktuForm";

const CloneWaktu = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Clone Waktu" description="Clone Waktu">
            <ParentCard title="Form Clone Waktu">
                <Alerts error={error} success={success}/>
                    <CloneWaktuForm setError={setError} setSuccess={setSuccess}/>
            </ParentCard>
        </PageContainer>
    );
};

export default CloneWaktu;