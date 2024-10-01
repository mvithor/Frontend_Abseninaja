import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import {
    Box,
    TextField,
  } from "@mui/material";
import BcCatatanKonselingList from "src/components/dashboardSiswa/CatatanKonseling/BcCatatanKonselingList";
import Alerts from "src/components/alerts/Alerts";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CatatanKonselingTable from "src/components/dashboardSiswa/CatatanKonseling/CatatanKonselingTable";

const CatatanKonselingList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [catatanKonseling, setCatatanKonseling] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCatatanKonseling = async () => {
            try {
                const response = await axiosInstance.get('/catatan-konseling');
                setCatatanKonseling(response.data);
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
                    }, 5000); 
            }
        };
        fetchCatatanKonseling();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCatatanKonseling = catatanKonseling
    .filter((catatanKonseling) => 
        catatanKonseling.judul_pengaduan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.judul_pengaduan.localeCompare(b.judul_pengaduan));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <PageContainer title="Catatan Konseling" description="Catatan Konseling">
            <BcCatatanKonselingList/>
            <Alerts error={error}/>
            <ParentCard title="Catatan Konseling Saya">
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
                </Box>
                <CatatanKonselingTable
                catatanKonseling={filteredCatatanKonseling}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default CatatanKonselingList;