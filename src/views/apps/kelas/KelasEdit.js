import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BreadcrumbKelasEdit from 'src/components/apps/kelas/kelasEdit/BreadcrumbEditKelas';
import KelasEditForm from 'src/components/apps/kelas/kelasEdit/KelasEdit';
import Alerts from 'src/components/alerts/Alerts';

const KelasEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    nama_kelas: '',
    wali_kelas_id: ''
  });

  useEffect(() => {
    const fetchKelasById = async (id) => {
      try {
        const response = await axiosInstance.get(`/kelas/${id}`);
        setFormState(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error.response?.data?.msg || error.message);
        setError("Terjadi kesalahan saat memuat data");
        setTimeout(() => setError(""), 3000);
      }
    };
    fetchKelasById(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors before starting
    
    try {
        const response = await axiosInstance.put(`/kelas/${id}`, formState);
        setSuccess(response.data.msg);
        setTimeout(() => navigate('/dashboard/admin/kelas'), 3000);
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
    <PageContainer title="Form Edit Kelas" description="Form Edit Kelas">
      <BreadcrumbKelasEdit />
      <Alerts error={error} success={success} />
      <ParentCard title="Form Edit Kelas">
        <KelasEditForm
          formState={formState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isLoading={isLoading}
        />
      </ParentCard>
    </PageContainer>
  );
};

export default KelasEdit;
