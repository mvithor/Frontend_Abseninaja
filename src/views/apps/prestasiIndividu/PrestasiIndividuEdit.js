import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BcPrestasiEditIndividu from "src/components/apps/prestasiIndividu/Edit/BcPrestasiEditIndividu";
import PrestasiIndividuEditForm from "src/components/apps/prestasiIndividu/Edit/PrestasiIndividuEdit";
import Alerts from "src/components/alerts/Alerts";

const PrestasiEditIndividu = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [prestasi, setPrestasi] = useState({
        student_id: '',
        tingkat_id: '',
        juara_id: '',
        penyelenggara: '',
        keterangan: ''
    });


    const fetchPrestasiIndividuById = async (id) => {
        try {
            const response = await axiosInstance.get(`/prestasi-individu/${id}`);
            setPrestasi(response.data);
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
                }, 3000);
        }
    };

    useEffect(() => {
        fetchPrestasiIndividuById(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestasi((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axiosInstance.put(`/prestasi-individu/${id}`, prestasi);
            setSuccess('Prestasi individu berhasil diperbarui');
            setTimeout(() => {
                navigate('/dashboard/admin/prestasi/individu');
            }, 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat memperbarui prestasi individu';
            console.error('Terjadi kesalahan:', errorMsg);
            setError(errorMsg);
            setTimeout(() => setError(""), 3000);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Form Edit Prestasi Individu" description="Form Edit Prestasi Individu">
             <BcPrestasiEditIndividu/>
             <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Prestasi Individu">
                <PrestasiIndividuEditForm
                    prestasi={prestasi}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    error={error}
                    success={success}
                    setError={setError}
                    setSuccess={setSuccess}
                    isLoading={isLoading}

                />
               
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiEditIndividu;
