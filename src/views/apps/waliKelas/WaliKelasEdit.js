import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BcWaliKelasEdit from 'src/components/apps/waliKelas/Edit/BcWaliKelasEdit';
import WaliKelasEditForm from 'src/components/apps/waliKelas/Edit/WaliKelasEditForm';
import Alerts from 'src/components/alerts/Alerts';

const WaliKelasEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [waliKelas, setWaliKelas] = useState({
        id: "",
        namaWali: "",
        alamat: "",
        nomorTelepon: "",
        jabatan: ""
    });

    const fetchWaliKelasById = async (id) => {
        try {
            const response = await axiosInstance.get(`/wali-kelas/${id}`);
            setWaliKelas(response.data);
            console.log(response.data);  // Cek data yang diterima
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Error fetching data:", error.response.data.msg);
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
        fetchWaliKelasById(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWaliKelas((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");  // Clear previous errors before starting

        try {
            const response = await axiosInstance.put(`/wali-kelas/${id}`, waliKelas);
            setSuccess(response.data.msg);
            setTimeout(() => navigate('/dashboard/admin/wali-kelas'), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.log(error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error('Terjadi kesalahan:', error.message);
                setError('Terjadi kesalahan saat memperbarui wali kelas');
            }
            setTimeout(() => setError(""), 3000);  
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Form Edit Wali Kelas" description='Form Edit Wali Kelas'>
            <BcWaliKelasEdit />
            <Alerts error={error} success={success} />
            <ParentCard title='Form Edit Wali Kelas'>
                <WaliKelasEditForm
                    waliKelas={waliKelas}
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

export default WaliKelasEdit;
