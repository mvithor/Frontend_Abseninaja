import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Alerts from "src/components/alerts/Alerts";
import BcAdminSekolahList from "src/apps/super-admin/admin-sekolah/List/BcAdminSekolahList";
import SearchButton from "src/components/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import AdminSekolahTable from "src/apps/super-admin/admin-sekolah/List/AdminSekolahTable";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";

const fetchAdminSekolah = async () => {
    const response = await axiosInstance.get('/api/v1/approved');
    return response.data
};

const AdminSekolahList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { data: admin = [], isLoading, isError, error: queryError } = useQuery({
        queryKey: ['adminSekolah'],
        queryFn: fetchAdminSekolah,
        onError: (error) => {
          const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
          setError(errorMessage);
        }
      });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    const filteredAdmin = admin
        .filter((admin) => 
          admin.nama.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.nama.localeCompare(b.nama));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleAdd = async (sekolah_id) => {
        navigate(`/dashboard/admin/manajemen-sekolah/tambah-admin/${sekolah_id}`);
    };

    return (
        <PageContainer title="Admin Sekolah" description="Admin Sekolah">
            <BcAdminSekolahList/>
            <Alerts error={error}/>
            <ParentCard title="Admin Sekolah">
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
                <AdminSekolahTable
                    admin={filteredAdmin}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleRowsPerPageChange}
                    handleAdd={handleAdd}
                    isLoading={isLoading}
                    isError={isError}
                    errorMessage={queryError?.message || "Terjadi kesalahan saat memuat data"}
                />
            </ParentCard>
        </PageContainer>
    );
};

export default AdminSekolahList;