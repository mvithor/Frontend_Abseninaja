import React, { useState } from "react";
import BcAddPrestasiMadrasah from "src/components/apps/prestasiMadrasah/prestasiMadrasahAdd/BcPrestasiAddMadrasah";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahPrestasiMadrasahForm from "src/components/apps/prestasiMadrasah/prestasiMadrasahAdd/TambahPrestasiMadrasahForm";

const PrestasiMadrasahAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Tambah Prestasi Madrasah" description="Tambah Prestasi Madrasah">
            <BcAddPrestasiMadrasah/>
            <Alerts error={error} success={success} />
            <ParentCard title="Form Tambah Prestasi Madrasah">
                <TambahPrestasiMadrasahForm 
                setSuccess={setSuccess} 
                setError={setError} 
                />
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiMadrasahAdd;
