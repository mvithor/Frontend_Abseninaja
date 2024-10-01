import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKeluargaEdit from "src/components/apps/statusKeluarga/Edit/BcStatusKeluargaEdit";
import StatusKeluargaEditForm from "src/components/apps/statusKeluarga/Edit/StatusKeluargaEditForm";

const StatusKeluargaEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [status, setStatus] = useState({
        nama_status: ''
    });

    const fetchStatusKeluargaById = async (id) => {
        try {
            const response = await axiosInstance.get(`/status-keluarga/${id}`);
            setStatus(response.data);
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
        fetchStatusKeluargaById(id);
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStatus((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event, status) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        if(!status) {
            setError('Status keluarga tidak boleh kosong');
            setIsLoading(false);
        };

        try {
            const response = await axiosInstance.put(`/status-keluarga/${id}`, status);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/dashboard/admin/status-keluarga');
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
        <PageContainer title="Form Edit Status Keluarga" description="Form Edit Status Keluarga">
            <BcStatusKeluargaEdit/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Status Keluarga">
                <StatusKeluargaEditForm
                status={status}
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

export default StatusKeluargaEdit;