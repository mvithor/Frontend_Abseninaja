import React, { useState } from "react";
import Alerts from "src/components/alerts/Alerts";
import BcKategoriPoinAdd from "src/components/apps/kategoriPoin/Add/BcKategoriPoinAdd";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import TambahKategoriPoinForm from "src/components/apps/kategoriPoin/Add/TambahKategoriPoinForm";

const KategoriPoinAdd = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    return (
        <PageContainer title="Tambah Kategori Poin" description="Tambah Kategori Poin">
            <BcKategoriPoinAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Kategori Poin">
                <TambahKategoriPoinForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default KategoriPoinAdd;