import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import { Box, Alert, CircularProgress } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KonselorEditForm from "src/components/apps/konselor/konselorEdit/KonselorEdit";
import BreadcrumbEditKonselor from "src/components/apps/konselor/konselorEdit/BreadcrumbEditKonselor";
import Alerts from "src/components/alerts/Alerts";

const KonselorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [konselor, setKonselor] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchKonselor = async () => {
      try {
        const response = await axiosInstance.get(`/konselor/${id}`);
        if (isMounted) {
          setKonselor(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false); // Set loading false terlebih dahulu
          if (error.response && error.response.data && error.response.data.msg) {
            console.log(error.response.data);
            setError(error.response.data.msg);
          } else if (error.request) {
            // Server tidak merespon
            console.error("Tidak bisa menjangkau server:", error.message);
            setLoadingError("Tidak bisa menjangkau server. Silakan coba lagi.");
          } else {
            console.error("Terjadi kesalahan:", error.message);
            setError("Terjadi kesalahan saat memuat data");
          }
        }
      }
    };

    fetchKonselor();

    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        setLoadingError("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
        setLoading(false);
      }
    }, 10000); // Timeout 10 detik

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKonselor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/konselor/${id}`, konselor);
      setSuccess('Data Konselor Berhasil di Perbarui');
      setTimeout(() => {
        navigate('/dashboard/admin/konselor');
      }, 3000);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengupdate data konselor:", error.message);
      setError("Terjadi kesalahan saat mengupdate data konselor");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/admin/konselor");
  };

  if (loading) {
    return (
      <PageContainer>
        <BreadcrumbEditKonselor/>
        <ParentCard title="Form Edit Konselor">
          <Box justifyContent="center" display="flex" mb={3}>
            <CircularProgress />
          </Box>
        </ParentCard>
      </PageContainer>
    );
  }

  if (loadingError) {
    return (
      <PageContainer>
        <BreadcrumbEditKonselor/>
        <ParentCard title="Form Edit Konselor">
          <Box justifyContent="center" display="flex" mb={3}>
            <Alert severity="error">{loadingError}</Alert>
          </Box>
        </ParentCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BreadcrumbEditKonselor />
      <Alerts error={error} success={success} />
      <ParentCard title="Form Edit Konselor">
        <KonselorEditForm
          konselor={konselor}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </ParentCard>
    </PageContainer>
  );
};

export default KonselorEdit;
