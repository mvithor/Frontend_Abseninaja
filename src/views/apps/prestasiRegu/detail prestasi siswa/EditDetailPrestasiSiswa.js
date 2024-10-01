import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BcEditDetaiPrestasilRegu from "src/components/apps/prestasiRegu/Detail/EditDetailRegu/BcEditDetailPrestasiRegu";
import EditDetailReguForm from "src/components/apps/prestasiRegu/Detail/EditDetailRegu/EditDetailReguForm";
import Alerts from "src/components/alerts/Alerts";

const EditDetailPrestasiSiswa = () => {
    const { id } = useParams();
    const [regu, setRegu] = useState({
        student_ids: '',
        tingkat_id: '',
        juara_id: '',
        penyelenggara: '',
        keterangan: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchPrestasiReguById = async (id) => {
        try {
            const response = await axiosInstance.get(`/prestasi-regu-siswa/${id}`);
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
        fetchPrestasiReguById(id);
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegu((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/prestasi-regu-siswa/${id}`, regu);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate(`/dashboard/admin/prestasi/regu/detail/${id}`);
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.log(error.response.data);
                setError(error.response.data.msg);
            } else {
                console.error('Terjadi kesalahan:', error.message);
                setError('Terjadi kesalahan saat memperbarui prestasi individu');
            }
            // Clear error after 3 seconds
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
        <PageContainer title="Form Edit Prestasi Tim Siswa" description="Form Edit Prestasi Tim Siswa">
            <BcEditDetaiPrestasilRegu/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit Prestasi Tim Siswa">
                <EditDetailReguForm
                regu={regu}
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

export default EditDetailPrestasiSiswa;