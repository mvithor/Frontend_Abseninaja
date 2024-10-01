import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcBimbinganAdd from "src/components/apps/bimbingan/Add/BcBimbinganAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahBidangForm from "src/components/apps/bimbingan/Add/TambahBidangForm";

const BidangBimbinganAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Bidang Bimbingan">
            <BcBimbinganAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Bidang Bimbingan">
                <TambahBidangForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default BidangBimbinganAdd;