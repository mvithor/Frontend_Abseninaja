import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKerjaSamaEdit from "src/apps/super-admin/status-kerja-sama/Edit/BcStatusKerjaSamaEdit";
import StatusKerjaSamaEditForm from "src/apps/super-admin/status-kerja-sama/Edit/StatusKerjaSamaEditForm";

// Fetch function to get status kerja sama by id
const fetchStatusKerjaSamaById = async (id) => {
    const response = await axiosInstance.get(`/api/v1/status/${id}`);
    return response.data;
};

const StatusKerjaSamaEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [statusData, setStatusData] = useState({
        status_kerja_sama: ''  // Default empty value
    });
    const queryClient = useQueryClient();

    // Fetch status kerja sama by id using useQuery
    const { data, isLoading: isFetching, isError, error: queryError } = useQuery({
        queryKey: ['statusKerjaSama', id],
        queryFn: () => fetchStatusKerjaSamaById(id),
        onError: (error) => {
            const errorMessage = error.response?.data?.msg || 'Terjadi kesalahan saat memuat data';
            setError(errorMessage);
            setTimeout(() => setError(''), 3000);
        }
    });

    // Menggunakan useEffect untuk memperbarui state `statusData` saat data berubah
    useEffect(() => {
        if (data) {
            setStatusData(data);  // Set data dari API ke state
        }
    }, [data]);  // Efek ini akan dipicu setiap kali `data` berubah

    const mutation = useMutation({
        mutationFn: async (status) => {
            return await axiosInstance.put(`/api/v1/status/${id}`, status);
        },
        onSuccess: (response) => {
            setSuccess(response.data.msg);
            queryClient.invalidateQueries(['statusKerjaSama', id]);
            setTimeout(() => {
                navigate('/dashboard/admin/status');
            }, 3000);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.msg || 'Terjadi kesalahan saat memperbarui status kerja sama';
            setError(errorMessage);
            setTimeout(() => setError(''), 3000);
        }
    });

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStatusData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (statusData) {
            mutation.mutate(statusData);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Form Edit Status Kerja Sama" description="Form Edit Status Kerja Sama">
            <BcStatusKerjaSamaEdit />
            <Alerts error={error || (isError && queryError?.message)} success={success} />
            <ParentCard title="Form Edit Status Kerja Sama">
                <StatusKerjaSamaEditForm
                    statusData={statusData}  // Pastikan statusData dikirimkan ke form
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    isLoading={isFetching || mutation.isLoading}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default StatusKerjaSamaEdit;
