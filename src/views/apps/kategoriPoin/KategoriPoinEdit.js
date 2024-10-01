import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import Alerts from "src/components/alerts/Alerts";
import BcKategoriPoinEdit from "src/components/apps/kategoriPoin/Edit/BcKategoriPoinEdit";
import KategoriPoinEditForm from "src/components/apps/kategoriPoin/Edit/KategoriPoinEditForm";

const KategoriPoinEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [poin, setPoin] = useState({
        nama_kategori: ''
    });

    const fetchKategoriPoinById = async (id) => {
        try {
            const response = await axiosInstance.get(`/kategori-poin/${id}`);
            setPoin(response.data);
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
        fetchKategoriPoinById(id);
    }, [id])

    const handleChange = (event) => {
        const { name, value} = event.target;
        setPoin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event, poin) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        if(!poin) {
            setError('Kategori Poin tidak boleh kosong');
            setIsLoading(false);
        }
        try {
            const response = await axiosInstance.put(`/kategori-poin/${id}`, poin);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/dashboard/admin/kategori-poin');
            }, 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat memperbarui kategori poin';
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
        <PageContainer title="Form Edit Kategori Poin" description="Form Edit Kategori Poin">
            <BcKategoriPoinEdit/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Kategori Poin">
                <KategoriPoinEditForm
                poin={poin}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                error={error}
                success={success}
                isLoading={isLoading}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default KategoriPoinEdit;