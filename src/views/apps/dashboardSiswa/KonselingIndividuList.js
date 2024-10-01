import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
  } from "@mui/material";
import BcKonselingIndividuList from "src/components/dashboardSiswa/KonselingIndividu/BcKonselingIndividuList";
import Alerts from "src/components/alerts/Alerts";
import { IconHealthRecognition } from "@tabler/icons";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KonselingIndividuTable from "src/components/dashboardSiswa/KonselingIndividu/KonselingIndividuTable";


const KonselingIndividuList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [konselingIndividu, setKonselingIndividu] = useState([]);
    const [statusKonselingOptions, setStatusKonselingOptions] = useState([])
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKonselingIndividuSiswa = async () => {
            try {
                const [responseKonselingIndividu, responseStatusKonseling] = await Promise.all([
                    axiosInstance.get('/konseling-individu'),
                    axiosInstance.get('/konseling-individu/options')
                    
                ]);
                setKonselingIndividu(responseKonselingIndividu.data);
                setStatusKonselingOptions(responseStatusKonseling.data);
                console.log('Status Konseling Options:', responseStatusKonseling.data);  // Debug log
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
        fetchKonselingIndividuSiswa();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredKonselingIndividu = konselingIndividu
    .filter((konselingIndividu) => 
        konselingIndividu.judul_pengaduan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.judul_pengaduan.localeCompare(b.judul_pengaduan));


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAdd = () => {
        navigate('/dashboard/siswa/konseling-individu/tambah-konseling-individu')
    };

    return (
        <PageContainer title="Konseling Individu" description="Konseling Individu">
            <BcKonselingIndividuList/>
            <Alerts error={error}/>
            <ParentCard title=" Konseling Individu Says">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
                >
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                    sx: { padding: "4px" },
                    }}
                    sx={{ flexGrow: 0, marginRight: 2 }}
                />
                <Button
                    sx={{
                        backgroundColor: "#F48C06",
                        '&:hover': { backgroundColor: "#2F327D" }
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<IconHealthRecognition style={{ color: 'white', marginRight: '8px' }} />}
                    onClick={handleAdd}
                    style={{color: 'white'}}
                >
                    Ajukan Konseling 
                </Button>
                </Box>
                <KonselingIndividuTable
                konselingIndividu={filteredKonselingIndividu}
                statusKonselingOptions={statusKonselingOptions}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default KonselingIndividuList;