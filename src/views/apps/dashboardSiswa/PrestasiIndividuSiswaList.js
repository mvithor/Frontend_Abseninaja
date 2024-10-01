import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import BcPrestasiIndividuSiswa from 'src/components/dashboardSiswa/PrestasiSiswa/BcPrestasiIndividuSiswa';
import Alerts from 'src/components/alerts/Alerts';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import PrestasiIndividuSiswaTable from 'src/components/dashboardSiswa/PrestasiSiswa/PrestasiIndividuSiswa';

const PrestasiIndividuSiswaList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [prestasiIndividu, setPrestasiIndividu] = useState([]);
    const [error, setError] = useState("");
    const [tingkatanOptions, setTingkatanOptions] = useState([]);
    const [juaraOptions, setJuaraOptions] = useState([]);

    useEffect(() => {
        const fetchPrestasiIndividuSiswa = async () => {
            try {
                const [responsePrestasi, responseTingkatan, responseJuara] = await Promise.all([
                    axiosInstance.get('/prestasi-siswa'),
                    axiosInstance.get('/options/tingkatan'),
                    axiosInstance.get('/options/juara'),
                ]);
                setPrestasiIndividu(responsePrestasi.data);
                setTingkatanOptions(responseTingkatan.data);
                setJuaraOptions(responseJuara.data);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.msg) {
                    console.error("Error fetching data:", error.response.data);
                    setError(error.response.data.msg);
                } else {
                    console.error("Terjadi kesalahan:", error.message);
                    setError("Terjadi kesalahan saat memuat data");
                }
                    setTimeout(() => {
                        setError("");
                    }, 2000); 
            }

        };
        fetchPrestasiIndividuSiswa();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <PageContainer title="Prestasi Saya" description="Prestasi Saya">
            <BcPrestasiIndividuSiswa/>
            <Alerts error={error}/>
            <ParentCard title="Prestasi Saya">
                <PrestasiIndividuSiswaTable
                prestasiIndividu={prestasiIndividu}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tingkatanOptions={tingkatanOptions}
                juaraOptions={juaraOptions}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiIndividuSiswaList;
