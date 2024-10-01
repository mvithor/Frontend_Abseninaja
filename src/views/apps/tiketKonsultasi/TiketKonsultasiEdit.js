import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Alerts from 'src/components/alerts/Alerts';
import BcTiketKonsultasiEdit from 'src/components/apps/tiketKonsultasi/BcTiketKonsultasiEdit';
import KonsultasiEditForm from 'src/components/apps/tiketKonsultasi/KonsultasiEdit';
import { fetchKonsultasiWaliSiswaById, fetchStatusOptions, setEditingItem } from 'src/store/apps/tiketKonsultasi/TiketKonsultasiSlice';

const KonsultasiEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const selectedKonsultasi = useSelector((state) => state.konsultasi.selectedKonsultasi);
    const statusOptions = useSelector((state) => state.konseling.statusOptions);

    useEffect(() => {
        if (id) {
            dispatch(fetchKonsultasiWaliSiswaById (id))
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Gagal memuat data');
            });
        }
    }, [dispatch,id]);

    useEffect(() => {
        dispatch(fetchStatusOptions())
        .catch((error) => {
            console.error('Error fetching status options:', error);
            setError('Gagal memuat opsi status');
        });
    }, [dispatch]);

    useEffect(() => {
        if (selectedKonsultasi) {
            dispatch(setEditingItem(selectedKonsultasi));
            console.log('Selected Konseling:', selectedKonsultasi);
        }
    }, [dispatch, selectedKonsultasi]);

    const handleSubmit = async (formState) => {
        if (!formState) {
            console.error('Form state is not defined');
            setError('Data yang akan diperbarui tidak ditemukan');
            return;
        }
        
        console.log('Submitting data:', formState);

        try {
            const response = await axiosInstance.put(`/konsultasi-wali-siswa/${id}`, formState);
            setSuccess(response.data.msg);
            setTimeout(() => {
                navigate('/dashboard/admin/tiket-konsultasi');
              }, 3000);
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Terjadi Kesalahan saat memperbarui data konseling individu');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Edit Konsultasi" description="Edit Konsultasi">
            <BcTiketKonsultasiEdit/>
            <ParentCard title="Edit Konsultasi">
                <Alerts error={error} success={success}/>
                <KonsultasiEditForm
                selectedKonsultasi={selectedKonsultasi}
                statusOptions={statusOptions}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default KonsultasiEdit;
