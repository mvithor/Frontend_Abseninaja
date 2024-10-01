import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axiosInstance';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BreadcrumbSiswaEdit from 'src/components/apps/siswa/siswaEdit/BreadcrumbSiswaEdit';
import StudentEditForm from 'src/components/apps/siswa/siswaEdit/StudentEdit';
import Alerts from 'src/components/alerts/Alerts';

const StudentEdit = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    jenis_kelamin_id: '',
    tanggal_lahir: null,
    kelas_id: '',
    alamat: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchStudentById = async (id) => {
    try {
      const response = await axiosInstance.get(`/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.log(error.response.data);
        setError(error.response.data.msg);
      } else {
        console.error('Terjadi kesalahan pada server:', error.message);
        setError('Terjadi kesalahan pada server');
      }
    }
  };

  useEffect(() => {
    fetchStudentById(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setStudent((prevState) => ({
      ...prevState,
      tanggal_lahir: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/students/${id}`, student);
      setSuccess('Data Siswa Berhasil di Perbarui');
      setTimeout(() => {
        navigate('/dashboard/admin/siswa');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.log(error.response.data);
        setError(error.response.data.msg);
      } else {
        console.error('Terjadi kesalahan:', error.message);
        setError('Terjadi kesalahan saat memperbarui data siswa');
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <PageContainer title=" Form Edit Siswa" description="Form Edit Siswa">
      <BreadcrumbSiswaEdit/>
      <Alerts error={error} success={success} />
      <ParentCard title="Form Edit Siswa">
        <StudentEditForm
          student={student}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          error={error}
          success={success}
        />
      </ParentCard>
    </PageContainer>
  );
};

export default StudentEdit;
