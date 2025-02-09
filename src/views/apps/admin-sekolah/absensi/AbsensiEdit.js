import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/utils/axiosInstance";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import Alerts from "src/components/alerts/Alerts";
import AbsensiEditForm from "src/apps/admin-sekolah/absensi/AbsensiEditForm";

const fetchAbsensiById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/absensi/${id}`);
        return response.data.data
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Error fetching absensi:", error);
        }
        throw new Error("Terjadi kesalahan saat mengambil data absensi Silakan coba lagi.");
    }
};

const AbsensiEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [absensiData, setAbsensiData] = useState({
        nama: '',
        kelas: '',
        tanggal: '',
        jam_masuk:'',
        jam_pulang: '',
        status_kehadiran: '',
        status_custom_id: '',
        keterangan: ''
    });

    const queryClient = useQueryClient();

    const { data, isLoading: isFetching, isError, error: queryError } = useQuery({
        queryKey: ['absensi', id],
        queryFn: () => fetchAbsensiById(id),
        onError: (error) => {
            const errorMessage = error.response?.data?.msg || 'Terjadi kesalahan saat memuat data';
            setError(errorMessage);
            setTimeout(() => setError(''), 3000);
        }
    });

    useEffect(() => {
        if (!id) {
            navigate("/dashboard/admin-sekolah/absensi-siswa"); 
        }
    }, [id, navigate]);

    useEffect(() => {
        if(data) {
            setAbsensiData(data);
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: async (absensi) => {
            return await axiosInstance.put(`/api/v2/absensi/${id}`, absensi);
        },
        onSuccess: (response) => {
            setAbsensiData(response.data.data);
            setSuccess(response.data.msg);
            queryClient.invalidateQueries(['absensi']);
            setTimeout(() => {
                navigate('/dashboard/admin-sekolah/absensi-siswa');
            }, 3000);
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || [];
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat memperbarui data absensi';
            if (errorDetails.length > 0) {
                setError(errorDetails.join(', '));
            } else {
                setError(errorMsg);
            }
            setTimeout(() => setError(''), 3000);
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAbsensiData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!absensiData) {
            return;
        }
    
        const dataToSend = {
            status_kehadiran: absensiData.status_kehadiran,
            status_custom_id: absensiData.status_custom_id,
            jam_pulang: absensiData.jam_pulang,
            keterangan: absensiData.keterangan
        };
    
        console.log("Mengirim data:", dataToSend);  // Debugging untuk melihat data sebelum dikirim
    
        mutation.mutate(dataToSend, {
            onSuccess: (response) => {
                console.log("Respon berhasil:", response); // Debugging response dari server
                setAbsensiData(response.data.data);
                setSuccess(response.data.msg);
            },
            onError: (error) => {
                console.error("Error saat mengirim data:", error.response?.data || error);
                setError(error.response?.data?.msg || "Terjadi kesalahan saat memperbarui data. Silakan coba lagi.");
            }
        });
    };
    
    
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <PageContainer title="Form Edit Absensi" description="Form Edit Absensi">
            <ParentCard title="Form Edit Absensi">
                <Alerts error={error || (isError && queryError?.message)} success={success} />
                <AbsensiEditForm
                    absensiData={absensiData || {}}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    isLoading={isFetching || mutation.isLoading}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default AbsensiEdit;