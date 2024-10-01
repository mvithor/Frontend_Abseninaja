import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BcAddDetaiPrestasilRegu from "src/components/apps/prestasiRegu/Detail/AddDetailRegu/BcAddDetailPrestasRegu";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahDetailPrestasiForm from "src/components/apps/prestasiRegu/Detail/AddDetailRegu/AddDetailReguForm";

const PrestasiDetailReguAdd = () => {
    const { id } = useParams(); 
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Form Tambah Prestasi Tim Siswa">
            <BcAddDetaiPrestasilRegu/>
            <Alerts id={id} error={error} success={success}/>
            <ParentCard title="Form Tambah Prestasi Tim Siswa">
                <TambahDetailPrestasiForm id={id} setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiDetailReguAdd;
