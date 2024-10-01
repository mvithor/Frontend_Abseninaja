import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BreadcrumbPelanggaranEdit from 'src/components/apps/pelanggaran/PelanggaranEdit/BreadcrumbPelanggaranEdit';
import PelanggaranEditForm from 'src/components/apps/pelanggaran/PelanggaranEdit/PelanggaranEdit';

const PelanggaranEdit = () => {
  const { id } = useParams();
  const [pelanggaran, setPelanggaran] = useState({
    nama_siswa: '',
    jenis_kelamin: '',
    waktu: null,
    peristiwa: '',
    tempat: '',
    informan: '',
    bidang_bimbingan: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchPelanggaranById = async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/api/pelanggaran/${id}`);
      setPelanggaran(response.data.dataPelanggaran[0]);
      // console.log('data fecth:',response.data.dataPelanggaran)
      // console.log('data pelanggaran:',response.data.dataPelanggaran[0])
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // console.log(error.response.data);
        setError(error.response.data.msg);
      } else {
        console.error('Terjadi kesalahan pada server:', error.message);
        setError('Terjadi kesalahan pada server');
      }
    }
  };

  useEffect(() => {
    fetchPelanggaranById(id);
  }, [id]);
  // console.log('data siswa:',pelanggaran)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelanggaran((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleDateChange = (date) => {
  //   setPelanggaran((prevState) => ({
  //     ...prevState,
  //     tanggal_lahir: date,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/admin/api/pelanggaran/${id}`, pelanggaran);
      setSuccess('Data Pelanggaran Berhasil di Perbarui');
      setTimeout(() => {
        navigate('/dashboard/admin/pelanggaran');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.log(error.response.data);
        setError(error.response.data.msg);
      } else {
        console.error('Terjadi kesalahan:', error.message);
        setError('Terjadi kesalahan saat memuat data');
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <BreadcrumbPelanggaranEdit />
      <Box justifyContent={'center'} mb={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Box>
      <ParentCard title="Form Edit Pelanggaran">
        <PelanggaranEditForm
          pelanggaran={pelanggaran}
          handleChange={handleChange}
          // handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          error={error}
          success={success}
        />
      </ParentCard>
    </PageContainer>
  );
};

export default PelanggaranEdit;
