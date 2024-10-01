import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BcPrestasiEditMadrasah from 'src/components/apps/prestasiMadrasah/prestasiMadrasahEdit/BcPrestasiEditMadrasah';
import PrestasiMadrasahEditForm from 'src/components/apps/prestasiMadrasah/prestasiMadrasahEdit/PrestasiMadrasahEdit';
import Alerts from 'src/components/alerts/Alerts';

const PrestasiEditMadrasah = () => {
    const { id } = useParams();
    const [prestasi, setPrestasi] = useState({
        lomba: '',
        tingkat_id: '',
        juara_id: '',
        penyelenggara: '',
        keterangan: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchPrestasiById = async (id) => {
        try {
            const response = await axiosInstance.get(`/prestasi-madrasah/${id}`);
            setPrestasi(response.data);
        } catch (error) {
            setError(error.response?.data?.msg || "Terjadi kesalahan saat memuat data");
            setTimeout(() => setError(''), 2000);
        }
    };

    useEffect(() => {
        fetchPrestasiById(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/prestasi-madrasah/${id}`, prestasi);
            setSuccess(response.data.msg);
            setTimeout(() => navigate('/dashboard/admin/prestasi/madrasah'), 2000);
        } catch (error) {
            setError(error.response?.data?.msg || "Terjadi kesalahan saat memperbarui prestasi madrasah");
            setTimeout(() => setError(''), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer title="Edit Prestasi Madrasah" description="Edit Prestasi Madrasah">
             <BcPrestasiEditMadrasah />
            <ParentCard title="Edit Prestasi Madrasah">
                <Alerts error={error} success={success} />
                <PrestasiMadrasahEditForm
                    prestasi={prestasi}
                    handleSubmit={handleSubmit}
                    setSuccess={setSuccess}
                    setError={setError}
                    isLoading={isLoading}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default PrestasiEditMadrasah;
