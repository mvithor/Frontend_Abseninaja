import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BcBimbinganEdit from "src/components/apps/bimbingan/Edit/BcBimbinganEdit";
import BidangBimbinganEditForm from "src/components/apps/bimbingan/Edit/BidangBimbinganEditForm";
import Alerts from "src/components/alerts/Alerts";

const BidangBimbinganEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [bidang, setBidang] = useState({
        bidang_bimbingan: ''
    });
  
    const fetchBidangBimbinganById = async (id) => {
        try {
            const response = await axiosInstance.get(`/bidang-bimbingan/${id}`);
            setBidang(response.data)
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
        fetchBidangBimbinganById(id);
    }, [id])

    const handleChange = (event) => {
        const { name, value} = event.target;
        setBidang((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event, bidang) => {
        event.preventDefault();
        setIsLoading(true)
        setError(''); 

    // Validasi data sebelum mengirim ke server
    if (!bidang) {
        setError('Nama bidang bimbingan tidak boleh kosong.');
        setIsLoading(false);
        return;
    }
        try {
            const response = await axiosInstance.put(`/bidang-bimbingan/${id}`, bidang);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/dashboard/admin/bidang-bimbingan');
            }, 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat memperbarui bidang bimbingan';
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
        <PageContainer title="Form Edit Bidang Bimbingan" description="Form Edit Bidang Bimbingan">
            <BcBimbinganEdit/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Bidang Bimbingan">
                <BidangBimbinganEditForm
                bidang={bidang}
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

export default BidangBimbinganEdit;