import React, { useState } from 'react';
import {
  Box,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material'; // Import ikon download
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/utils/axiosInstance';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import Alerts from 'src/components/alerts/Alerts';
import QrCodeGenerate from 'src/apps/admin-sekolah/qr-codes/generate-qr-code/QrCodeGenerate';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';

const QrCodeGenerateList = () => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedSiswa, setSelectedSiswa] = useState('');
  const [selectedSiswaNama, setSelectedSiswaNama] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState('');

  // Fetch kelas
  const {
    data: kelasOptions = [],
    isLoading: loadingKelas,
    isError: isErrorKelas,
    error: errorKelas,
  } = useQuery({
    queryKey: ['kelasOptions'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/dropdown/kelas');
      return response.data.data;
    },
    onError: (error) => {
      setError(error.response?.data?.msg || 'Terjadi kesalahan saat memuat data kelas');
      setTimeout(() => setError(''), 3000);
    },
  });

  // Fetch siswa
  const {
    data: siswa = [],
    isLoading: loadingSiswa,
    isError: isErrorSiswa,
    error: errorSiswa,
    refetch: refetchSiswa,
  } = useQuery({
    queryKey: ['siswaOptions', selectedKelas],
    queryFn: async () => {
      if (!selectedKelas) return [];
      const response = await axiosInstance.get(`/api/v2/siswa?kelas_id=${selectedKelas}`);
      return response.data.data;
    },
    enabled: !!selectedKelas,
    onError: (error) => {
      setError(error.response?.data?.msg || 'Terjadi kesalahan saat memuat data siswa');
      setTimeout(() => setError(''), 3000);
    },
  });

  // Handle dropdown changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'kelas_id') {
      setSelectedKelas(value);
      setSelectedSiswa('');
      setSelectedSiswaNama('');
      refetchSiswa();
    } else if (name === 'id') {
      setSelectedSiswa(value);

      // Ambil nama siswa dari daftar siswa berdasarkan ID yang dipilih
      const selectedSiswaObj = siswa.find((s) => s.id === value);
      if (selectedSiswaObj) {
        setSelectedSiswaNama(selectedSiswaObj.User.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''));
      }
    }
  };

  // Preview QR Code
  const { mutate: previewQrCode } = useMutation({
    mutationFn: async (siswaId) => {
      const response = await axiosInstance.get(`/api/v1/generate-qr-codes/preview/${siswaId}`);
      return response.data;
    },
    onSuccess: (data) => {
      setPreviewData(data);
    },
    onError: (error) => {
      setError(error.response?.data?.msg || 'Terjadi kesalahan saat memuat preview data');
      setTimeout(() => setError(''), 3000);
    },
  });

  const handlePreview = (siswaId) => {
    previewQrCode(siswaId);
  };

  const closePreview = () => setPreviewData(null);

  // Handle download kartu pelajar seluruh kelas
  const handleDownloadKelas = async () => {
    try {
      if (!selectedKelas) {
        setError('Silakan pilih kelas terlebih dahulu.');
        setTimeout(() => setError(''), 3000);
        return;
      }
  
      const selectedKelasObj = kelasOptions.find((kelas) => kelas.id === selectedKelas);
      const selectedKelasNama = selectedKelasObj
        ? selectedKelasObj.nama_kelas.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
        : 'kelas';
  
      const response = await axiosInstance.get(`/api/v1/kartu-pelajar/download/kelas/${selectedKelas}`, {
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `kartu_pelajar_${selectedKelasNama}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Gagal mengunduh file kartu pelajar kelas. Silakan coba lagi.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <PageContainer title="Generate QR-Code" description="Generate QR-Code">
      <ParentCard title="Generate QR-Code Siswa">
        <Alerts error={error} />
        <Box sx={{ mb: 4, mt: -6 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <CustomFormLabel sx={{ mt: 1 }}>Kelas</CustomFormLabel>
              <CustomSelect
                name="kelas_id"
                value={selectedKelas}
                onChange={handleChange}
                displayEmpty
                disabled={loadingKelas}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Pilih Kelas
                </MenuItem>
                {kelasOptions.map((kelas) => (
                  <MenuItem key={`kelas-${kelas.id}`} value={kelas.id}>
                    {kelas.nama_kelas}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} sm={5}>
              <CustomFormLabel sx={{ mt: 1 }}>Nama Siswa</CustomFormLabel>
              <CustomSelect
                name="id"
                value={selectedSiswa}
                onChange={handleChange}
                displayEmpty
                disabled={loadingSiswa || !selectedKelas}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Pilih Siswa
                </MenuItem>
                {siswa.map((s) => (
                  <MenuItem key={`siswa-${s.id}`} value={s.id}>
                    {s.User.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} sm={2} mt={5}>
              {!selectedSiswa && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadKelas}
                  disabled={!selectedKelas}
                >
                  Download
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        <QrCodeGenerate
          siswa={selectedSiswa ? siswa.filter((s) => s.id === selectedSiswa) : siswa}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={(e, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          handlePreview={handlePreview}
          isLoading={loadingKelas || loadingSiswa}
          isError={isErrorKelas || isErrorSiswa}
          errorMessage={errorKelas?.response?.data?.msg || errorSiswa?.response?.data?.msg || ''}
        />
        <Dialog open={!!previewData} onClose={closePreview} maxWidth="sm" fullWidth>
          <DialogContent>
            {previewData?.card_url ? (
              <img
                src={previewData.card_url}
                alt="Preview QR Code"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closePreview} variant="outlined" color="secondary">
              Tutup
            </Button>
            <Button
              onClick={async () => {
                try {
                  if (!selectedSiswa) {
                    setError('Silakan pilih siswa terlebih dahulu.');
                    setTimeout(() => setError(''), 3000);
                    return;
                  }

                  const response = await axiosInstance.get(
                    `/api/v1/kartu-pelajar/download/siswa/${selectedSiswa}`,
                    { responseType: 'blob' }
                  );

                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `kartu_pelajar_${selectedSiswaNama || 'siswa'}.png`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } catch (error) {
                  setError('Gagal mengunduh file kartu pelajar. Silakan coba lagi.');
                  setTimeout(() => setError(''), 3000);
                }
              }}
              variant="contained"
              color="primary"
            >
              Download Kartu
            </Button>
          </DialogActions>
        </Dialog>
      </ParentCard>
    </PageContainer>
  );
};

export default QrCodeGenerateList;
