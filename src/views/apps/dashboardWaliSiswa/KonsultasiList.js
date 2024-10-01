import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
  } from "@mui/material";
import BcKonsultasiList from "src/components/dashboardWaliSiswa/Konsultasi/BcKonsultasiList";
import Alerts from "src/components/alerts/Alerts";
import { IconReceipt } from "@tabler/icons";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KonsultasiTable from "src/components/dashboardWaliSiswa/Konsultasi/KonsultasiTable";

const KonsultasiList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [konsultasiWaliSiswa, setKonsultasiWaliSiswa] = useState([]);
    const [statusKonselingOptions, setStatusKonselingOptions] = useState([])
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKonsultasiWaliSiswa = async () => {
            try {
                const [responseKonsultasiWaliSiswa, responseStatusKonseling] = await Promise.all([
                    axiosInstance.get('/konsultasi-wali-siswa'),
                    axiosInstance.get('/konsultasi-wali-siswa/options')
                ]);
                setKonsultasiWaliSiswa(responseKonsultasiWaliSiswa.data);
                setStatusKonselingOptions(responseStatusKonseling.data);
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
        fetchKonsultasiWaliSiswa();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredKonsultasiWaliSiswa = konsultasiWaliSiswa
    .filter((konsultasiWaliSiswa) => 
        konsultasiWaliSiswa.topik.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.topik.localeCompare(b.topik));


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAdd = () => {
        navigate('/dashboard/wali-siswa/konsultasi/tambah-konsultasi')
    };

    return (
        <PageContainer title="Konsultasi" description="Konsultasi">
            <BcKonsultasiList/>
            <Alerts error={error}/>
            <ParentCard title="Konsultasi Saya">
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
                    startIcon={<IconReceipt style={{ color: 'white', marginRight: '8px' }} />}
                    onClick={handleAdd}
                    style={{color: 'white'}}
                >
                    Ajukan Konsultasi
                </Button>
                </Box>
                <KonsultasiTable
                konsultasiWaliSiswa={filteredKonsultasiWaliSiswa}
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

export default KonsultasiList;