import React, { useState } from "react";
import BcPoinSiswaAdd from "src/components/apps/poinSiswa/Add/BcPoinSiswaAdd";
import PageContainer from "src/components/container/PageContainer";
import Alerts from "src/components/alerts/Alerts";
import ParentCard from "src/components/shared/ParentCard";
import TambahPoinSiswaForm from "src/components/apps/poinSiswa/Add/TambahPoinSiswa";

const PoinSiswaAdd = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <PageContainer title="Form Poin Siswa" description="Form Poin Siswa">
            <BcPoinSiswaAdd/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Tambah Poin Siswa">
                <TambahPoinSiswaForm setSuccess={setSuccess} setError={setError}/>
            </ParentCard>
        </PageContainer>
    );
};

export default PoinSiswaAdd;