import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import { Box } from "@mui/material";
import BcWaliSiswaList from 'src/components/apps/walisiswa/BcWaliSiswaList';
import SearchButton from 'src/components/apps/buttonGroup/SearchButton';
import Alerts from 'src/components/alerts/Alerts';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import WaliSiswaTable from 'src/components/apps/walisiswa/WaliSiswaTable';

const WaliSiswaList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [wali, setWali] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusOptions, setStatusOptions] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWaliSiswa = async () => {
            try {
                const [responseWaliSiswa, responseStatus] = await Promise.all([
                    axiosInstance.get('/wali-siswa'),
                    axiosInstance.get('/wali-siswa/status-keluarga/options')
                ]);
                setWali(responseWaliSiswa.data);
                setStatusOptions(responseStatus.data);

                console.log("Response Wali Siswa:", responseWaliSiswa.data);
            console.log("Response Status Keluarga:", responseStatus.data);  
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

        fetchWaliSiswa();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredWaliSiswa = wali
    .filter((waliSiswa) =>
      waliSiswa.wali_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.wali_name.localeCompare(b.wali_name));

    return (
        <PageContainer title="Data Wali Siswa" description="Data Wali Siswa">
            <BcWaliSiswaList/>
            <Alerts error={error}/>
            <ParentCard title="Wali Siswa">
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
          </Box>
          <WaliSiswaTable
            wali={filteredWaliSiswa}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleRowsPerPageChange}
            statusOptions={statusOptions}
          />
            </ParentCard>
        </PageContainer>
    );
};


export default WaliSiswaList;
