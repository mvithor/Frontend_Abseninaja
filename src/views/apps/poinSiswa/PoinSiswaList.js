import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Box,
} from "@mui/material";
import { IconStars } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcPoinSiswaList from "src/components/apps/poinSiswa/List/BcPoinSiswaList";
import AddButton from "src/components/apps/buttonGroup/AddButton";
import SearchButton from "src/components/apps/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import PoinSiswaTable from "src/components/apps/poinSiswa/List/PoinSiswaTable";

const PoinSiswaList = () => {
    const [poin, setPoin] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [studentOptions, setStudentOptions] = useState([]);
    const [kategoriPoinOptions, setKategoriPoinOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPoin = async () => {
            try {
                const [responsePoin, responseStudent, responseKategori] = await Promise.all([
                    axiosInstance.get('/poin/jumlah-poin'),
                    axiosInstance.get('/poin/options'),
                    axiosInstance.get('/kategori-poin/options')
                ]);

                // Sorting data poin by total_points in descending order
                const sortedPoin = responsePoin.data.sort((a, b) => b.total_points - a.total_points);

                setPoin(sortedPoin);
                setStudentOptions(responseStudent.data);
                setKategoriPoinOptions(responseKategori.data);
            } catch (error) {
                const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
                console.error("Terjadi kesalahan:", errorMessage);
                setError(errorMessage);
            } finally {
                const timer = setTimeout(() => {
                    setError("");
                    setSuccess("");
                }, 3000);
                return () => clearTimeout(timer);
            }
        };
        fetchPoin();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getStudentName = (studentId) => {
        const student = studentOptions.find(option => option.id === studentId);
        return student ? student.name : '';
    };

    // Tidak perlu sorting ulang di sini, karena data sudah diurutkan di useEffect
    const filteredPoin = poin.filter((poin) =>
        getStudentName(poin.student_id).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAdd = () => {
        navigate('/dashboard/admin/poin/tambah-poin');
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <PageContainer title="Poin Siswa" description="Poin Siswa">
            <BcPoinSiswaList />
            <Alerts error={error} success={success} />
            <ParentCard title="Poin Siswa">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <SearchButton
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <AddButton
                        icon={<IconStars style={{ color: 'white', marginRight: '8px' }} />}
                        onClick={handleAdd}
                    >
                        Tambah Poin Siswa
                    </AddButton>
                </Box>
                <PoinSiswaTable
                    poin={filteredPoin}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    studentOptions={studentOptions}
                    kategoriPoinOptions={kategoriPoinOptions}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default PoinSiswaList;
