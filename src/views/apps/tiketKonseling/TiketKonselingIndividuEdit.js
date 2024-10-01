import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BcTiketKonselingEdit from 'src/components/apps/tiketKonselingIndividu/BcTiketKonselingEdit';
import KonselingEditForm from 'src/components/apps/tiketKonselingIndividu/KonselingEdit';
import Alerts from 'src/components/alerts/Alerts';
import { fetchKonselingIndividuById, fetchStatusOptions, setEditingItem } from 'src/store/apps/tiketKonseling/TiketKonselingIndividuSlice';

const KonselingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const selectedKonseling = useSelector((state) => state.konseling.selectedKonseling);
  const statusOptions = useSelector((state) => state.konseling.statusOptions);


  useEffect(() => {
    if (id) {
      dispatch(fetchKonselingIndividuById(id))
        .catch((err) => {
          console.error('Error fetching data:', err);
          setError('Gagal memuat data');
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchStatusOptions())
      .catch((err) => {
        console.error('Error fetching status options:', err);
        setError('Gagal memuat opsi status');
      });
  }, [dispatch]);

  useEffect(() => {
    if (selectedKonseling) {
      dispatch(setEditingItem(selectedKonseling));
      console.log('Selected Konseling:', selectedKonseling);
    }
  }, [dispatch, selectedKonseling]);

  const handleSubmit = async (formState) => {
    if (!formState) {
      console.error('Form state is not defined');
      setError('Data yang akan diperbarui tidak ditemukan');
      return;
    }

    console.log('Submitting data:', formState);
    try {
      const response = await axiosInstance.put(`/konseling-individu/${id}`, formState);
      setSuccess(response.data.msg);
      setTimeout(() => {
        navigate('/dashboard/admin/tiket-konseling-individu');
      }, 3000);
    } catch (err) {
      console.error('Error updating data:', err);
      setError('Terjadi Kesalahan saat memperbarui data konseling individu');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="Edit Konseling Individu" description="this is Edit Konseling Individu page">
      <BcTiketKonselingEdit />
      <ParentCard title="Edit Konseling Individu">
        <Alerts error={error} success={success} />
        <KonselingEditForm
          selectedKonseling={selectedKonseling}
          statusOptions={statusOptions}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </ParentCard>
    </PageContainer>
  );
};

export default KonselingEdit;
