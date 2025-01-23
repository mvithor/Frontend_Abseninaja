import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import { IconHomeHeart } from "@tabler/icons";
import Alerts from "src/components/alerts/Alerts";
import BcStatusKerjaSamaList from "src/apps/super-admin/status-kerja-sama/List/BcStatusKerjaSamaList";
import AddButton from "src/components/buttonGroup/AddButton";
import SearchButton from "src/components/buttonGroup/SearchButton";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import StatusKerjaSamaTable from "src/apps/super-admin/status-kerja-sama/List/StatusKerjaSamaTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";


const fetchStatusKerjaSama = async () => {
  const response = await axiosInstance.get('/api/v1/status');
  return response.data;
};

const StatusKerjaSamaList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { data: status = [], isLoading, isError, error: queryError } = useQuery({
    queryKey: ['statusKerjaSama'],
    queryFn: fetchStatusKerjaSama,
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
      setError(errorMessage);
    }
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/api/v1/status/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['statusKerjaSama']);
      setSuccess("Status kerja sama berhasil dihapus");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menghapus data";
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStatus = status
    .filter((status) => 
      status.status_kerja_sama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.status_kerja_sama.localeCompare(b.status_kerja_sama));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    navigate(`/dashboard/admin/status/tambah-status`);
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/admin/status/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteStatus) {
      setError("Status kerja sama tidak ditemukan");
      return;
    }
    deleteMutation.mutate(deleteStatus);
    setConfirmDialogOpen(false);
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteStatus(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Status Kerja Sama" description="Status Kerja Sama">
      <BcStatusKerjaSamaList />
      <Alerts error={error} success={success} />
      <ParentCard title="Status Kerja Sama">
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
            icon={<IconHomeHeart style={{ color: 'white', marginRight: '8px' }} />}
            onClick={handleAdd}
          >
            Tambah Status
          </AddButton>
        </Box>
        <StatusKerjaSamaTable
          status={filteredStatus}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          handleEdit={handleEdit}
          handleDelete={handleOpenConfirmDialog}
          isLoading={isLoading}
          isError={isError}
          errorMessage={queryError?.message || "Terjadi kesalahan saat memuat data"}
        />
      </ParentCard>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h5" align="center" sx={{ mt: 2, mb: 2 }}>
            Apakah Anda yakin ingin menghapus status kerja sama?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button
            sx={{ mr: 3 }}
            variant="outlined"
            color="secondary"
            onClick={handleCloseConfirmDialog}
          >
            Batal
          </Button>
          <Button
            sx={{
              mr: 3,
              backgroundColor: "#F48C06",
              '&:hover': { backgroundColor: "#f7a944" }
            }}
            variant="contained"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? <CircularProgress size={24} /> : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default StatusKerjaSamaList;
