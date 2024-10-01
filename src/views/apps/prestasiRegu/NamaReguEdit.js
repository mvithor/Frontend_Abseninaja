import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BcNamaReguEdit from "src/components/apps/prestasiRegu/Edit/BcNamaReguEdit";
import NamaReguEditForm from "src/components/apps/prestasiRegu/Edit/NamaReguEditForm";
import Alerts from "src/components/alerts/Alerts";

const NamaReguEdit = () => {
    const { id } = useParams();
    const [regu, setRegu] = useState({
        nama_regu: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const fetchReguById = async (id) => {
        try {
            const response = await axiosInstance.get(`/prestasi-regu/${id}`);
            setRegu(response.data)
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
        fetchReguById(id);
    }, [id])

    const handleChange = (event) => {
        const { name, value} = event.target;
        setRegu((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event, regu) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/prestasi-regu/${id}`, regu);
            setSuccess(response.data.msg);
            setError("");
            setTimeout(() => {
                navigate('/dashboard/admin/prestasi/regu');
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error('Terjadi kesalahan:', error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error('Terjadi kesalahan:', error.message);
                setError('Terjadi kesalahan saat memperbarui data');
            }
            setSuccess("");
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Form Edit Nama Tim" description="Form Edit Nama Tim">
            <BcNamaReguEdit/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Nama Tim">
                <NamaReguEditForm
                regu={regu}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                error={error}
                success={success}
                isLoading={isLoading}
                />
            </ParentCard>
        </PageContainer>
    )
}

export default NamaReguEdit;