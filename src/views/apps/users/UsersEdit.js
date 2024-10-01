import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import BcUsersEdit from "src/components/apps/users/Edit/BcUsersEdit";
import UsersEditForm from "src/components/apps/users/Edit/UsersEditForm";
import Alerts from "src/components/alerts/Alerts";

const UsersEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        updated_at: '',
        role_id: ''
    });

    const fetchUsersById = async (id) => {
        try {
            const response = await axiosInstance.get(`/users/${id}`);
            setUser(response.data);
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
        fetchUsersById(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/users/${id}`, user);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/dashboard/admin/users');
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
        <PageContainer title="Form Edit User" description="Form Edit User">
            <BcUsersEdit/>
            <Alerts error={error} success={success}/>
            <ParentCard title="Form Edit User">
                <UsersEditForm
                user={user}
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

export default UsersEdit;