import React, { useState } from 'react';
import {
  Dialog,
  Grid,
  DialogContent,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogTitle,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid'; // DataGrid dari MUI
import axiosInstance from 'src/utils/axiosInstance';
import Alerts from 'src/components/alerts/Alerts';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import RekapAbsensiTable from 'src/apps/admin-sekolah/rekap-absensi/RekapAbsensiTable';

const RekapAbsensiList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'laporan' atau 'absensi'
  const [siswaData, setSiswaData] = useState([]);
  const [tanggalArray, setTanggalArray] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [kelasId, setKelasId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  // Fetch data kelas
  const { data: kelasRekap = [], isLoading, isError } = useQuery({
    queryKey: ['kelasOptions'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/kelas/wali');
      return response.data.data;
    },
    onError: (error) => {
      setError(error.response?.data?.msg || 'Terjadi kesalahan saat memuat data kelas');
      setTimeout(() => setError(''), 3000);
    },
  });

  // Fetch laporan data
  const fetchLaporan = async (kelasId) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get('/api/v1/rekap-laporan', { params: { kelasId } });
      setSiswaData(response.data.data);
    } catch (error) {
      setError('Gagal mengambil data laporan.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch absensi per tanggal (tanpa filter jika tanggal tidak dipilih)
  const fetchAbsensiPerTanggal = async (kelasId, startDate = '', endDate = '') => {
    setIsFetching(true);
    try {
      const params = { kelasId };
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axiosInstance.get('/api/v1/rekap-absensi-tanggal', { params });
      const { tanggalArray, rekap } = response.data;

      setTanggalArray(tanggalArray);
      setSiswaData(rekap);
    } catch (error) {
      setError('Gagal mengambil data absensi.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsFetching(false);
    }
  };

  // Open modal and fetch data
  const handleOpenModal = (type, id) => {
    setModalType(type);
    setKelasId(id);
    setModalOpen(true);

    if (type === 'laporan') {
      fetchLaporan(id);
    } else if (type === 'absensi') {
      fetchAbsensiPerTanggal(id);
    }
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setError('Lengkapi tanggal mulai dan tanggal akhir.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    fetchAbsensiPerTanggal(kelasId, startDate, endDate);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSiswaData([]);
    setTanggalArray([]);
    setStartDate('');
    setEndDate('');
  };

  return (
    <PageContainer title="Rekap Absensi" description="Lihat data laporan dan absensi siswa berdasarkan kelas.">
      <ParentCard title="Rekap Absensi">
        <Alerts error={error} />
        <RekapAbsensiTable
          kelasRekap={kelasRekap}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={(e, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          handleLaporan={(id) => handleOpenModal('laporan', id)}
          handleAbsensi={(id) => handleOpenModal('absensi', id)}
          isLoading={isLoading}
          isError={isError}
        />
        {/* Modal */}
        <Dialog open={modalOpen} onClose={closeModal} maxWidth="xl" fullWidth>
          <DialogTitle align="center">
            {modalType === 'laporan' ? 'Data Laporan' : 'Data Absensi Per Tanggal'}
          </DialogTitle>
          <DialogContent>
            {modalType === 'laporan' ? (
              <>
                {/* Konten Laporan */}
                {isFetching ? (
                  <CircularProgress />
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Nama Siswa</TableCell>
                          <TableCell>Total Hadir</TableCell>
                          <TableCell>Total Sakit</TableCell>
                          <TableCell>Total Izin</TableCell>
                          <TableCell>Total Alpa</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {siswaData.map((siswa, index) => (
                          <TableRow key={`laporan-${index}`}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{siswa.nama_siswa}</TableCell>
                            <TableCell>{siswa.kehadiran}</TableCell>
                            <TableCell>{siswa.sakit}</TableCell>
                            <TableCell>{siswa.izin}</TableCell>
                            <TableCell>{siswa.alpa}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            ) : (
              <>
                {/* Konten Absensi dengan DataGrid */}
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} md={4}>
                    <CustomFormLabel>Tanggal Mulai</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        renderInput={(props) => <CustomTextField {...props} fullWidth />}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomFormLabel>Tanggal Akhir</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        renderInput={(props) => <CustomTextField {...props} fullWidth />}
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFilter}
                      disabled={!startDate || !endDate}
                    >
                      Terapkan
                    </Button>
                  </Grid>
                </Grid>
                {isFetching ? (
                  <CircularProgress />
                ) : (
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={siswaData.map((siswa, idx) => {
                        const row = { id: idx, nama_siswa: siswa.nama_siswa };
                        siswa.absensi.forEach((status, i) => {
                          row[`tanggal_${i}`] = status;
                        });
                        return row;
                      })}
                      columns={[
                        { field: 'nama_siswa', headerName: 'Nama Siswa', width: 200 },
                        ...tanggalArray.map((tanggal, idx) => ({
                          field: `tanggal_${idx}`,
                          headerName: tanggal,
                          width: 100,
                          align: 'center',
                          headerAlign: 'center',
                        })),
                      ]}
                      pageSize={10}
                      rowsPerPageOptions={[10, 20, 50]}
                      disableSelectionOnClick
                      autoHeight
                    />
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </ParentCard>
    </PageContainer>
  );
};

export default RekapAbsensiList;




// import React, { useState } from 'react';
// import {
//   Dialog,
//   Grid,
//   DialogContent,
//   Button,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   DialogTitle,
//   Typography,
// } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import { saveAs } from 'file-saver'; 
// import axiosInstance from 'src/utils/axiosInstance';
// import Alerts from 'src/components/alerts/Alerts';
// import PageContainer from 'src/components/container/PageContainer';
// import ParentCard from 'src/components/shared/ParentCard';
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers";
// import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
// import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
// import RekapAbsensiTable from 'src/apps/admin-sekolah/rekap-absensi/RekapAbsensiTable';

// const RekapAbsensiList = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [siswaAbsensi, setSiswaAbsensi] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState('');
//   const [isFetching, setIsFetching] = useState(false);
//   const [kelasId, setKelasId] = useState(null);

//   // Fetch kelas data
//   const { data: kelasRekap = [], isLoading, isError } = useQuery({
//     queryKey: ['kelasOptions'],
//     queryFn: async () => {
//       const response = await axiosInstance.get('/api/v1/kelas/wali');
//       return response.data.data;
//     },
//     onError: (error) => {
//       setError(error.response?.data?.msg || 'Terjadi kesalahan saat memuat data kelas');
//       setTimeout(() => setError(''), 3000);
//     },
//   });

//   // Fetch siswa dan absensi
//   const fetchSiswaAbsensi = async (kelasId, startDate = '', endDate = '') => {
//     setIsFetching(true);
//     try {
//       const params = { kelasId }; // Selalu kirim kelasId
//       if (startDate && endDate) {
//         params.startDate = startDate;
//         params.endDate = endDate;
//       }

//       const response = await axiosInstance.get('/api/v1/rekap-absensi', { params });
//       setSiswaAbsensi(response.data.data);
//     } catch (error) {
//       setError('Gagal mengambil data siswa dan absensi.');
//       setTimeout(() => setError(''), 3000);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleLaporan = async (id) => {
//     setKelasId(id);
//     fetchSiswaAbsensi(id); // Ambil data terbaru tanpa filter
//     setModalOpen(true);
//   };

//   const handleFilter = () => {
//     if (!startDate || !endDate) {
//       setError('Lengkapi tanggal mulai dan tanggal akhir.');
//       setTimeout(() => setError(''), 3000);
//       return;
//     }
//     fetchSiswaAbsensi(kelasId, startDate, endDate);
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       const params = { kelasId, startDate, endDate };
//       const response = await axiosInstance.get('/api/v1/generate-absensi-pdf', {
//         params,
//         responseType: 'blob',
//       });

//       const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
//       saveAs(pdfBlob, `rekap_absensi_kelas_${kelasId}.pdf`);
//     } catch (error) {
//       setError('Gagal mengunduh PDF.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSiswaAbsensi([]);
//     setStartDate('');
//     setEndDate('');
//   };

//   return (
//     <PageContainer title="Rekap Absensi" description="Lihat data absensi siswa berdasarkan kelas.">
//       <ParentCard title="Rekap Absensi">
//         <Alerts error={error} />
//         <RekapAbsensiTable
//           kelasRekap={kelasRekap}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={(e, newPage) => setPage(newPage)}
//           handleChangeRowsPerPage={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
//           handleLaporan={handleLaporan}
//           isLoading={isLoading}
//           isError={isError}
//           errorMessage={error}
//         />
//         {/* Modal */}
//         <Dialog open={modalOpen} onClose={closeModal} maxWidth="lg" fullWidth>
//           <DialogTitle align='center' mt={1} mb={2}>Rekap Absensi</DialogTitle>
//             <DialogContent>
//             <Grid container spacing={2} alignItems="center" mb={3}>
//               <Grid item xs={12} md={4}>
//                 <CustomFormLabel htmlFor="tanggal_mulai" sx={{ mt: 1 }}>
//                   Tanggal Mulai
//                 </CustomFormLabel>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     renderInput={(props) => (
//                       <CustomTextField
//                         {...props}
//                         fullWidth
//                         size="medium"
//                       />
//                     )}
//                     value={startDate}
//                     onChange={(newValue) => setStartDate(newValue)}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <CustomFormLabel htmlFor="tanggal_akhir" sx={{ mt: 1 }}>
//                   Tanggal Akhir
//                 </CustomFormLabel>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     renderInput={(props) => (
//                       <CustomTextField
//                         {...props}
//                         fullWidth
//                         size="medium"
//                       />
//                     )}
//                     value={endDate}
//                     onChange={(newValue) => setEndDate(newValue)}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={12} md={4} display="flex" justifyContent="flex-start" alignItems="center">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleFilter}
//                   disabled={!startDate || !endDate}
//                   sx={{
//                     minWidth: '120px', // Lebar minimal tombol
//                     height: '42px',    // Tinggi tombol disamakan dengan input
//                     mt: 5,             // Memberi jarak vertikal agar sejajar
//                   }}
//                 >
//                   Terapkan
//                 </Button>
//               </Grid>
//             </Grid>
//             {isFetching ? (
//               <CircularProgress />
//             ) : (
//               <TableContainer component={Paper} variant='outlined'>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>No</Typography>
//                       </TableCell>
//                       <TableCell align='center'>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>Nama Siswa</Typography>
//                       </TableCell>
//                       <TableCell align='center'>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>Total Hadir</Typography>
//                       </TableCell>
//                       <TableCell align='center'>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>Total Sakit</Typography>
//                       </TableCell>
//                       <TableCell align='center'>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>Total Izin</Typography>
//                       </TableCell>
//                       <TableCell align='center'>
//                         <Typography variant='h6' sx={{ fontSize: '0.95rem'}}>Total Alpa</Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {siswaAbsensi.map((siswa, index) => (
//                       <TableRow key={`siswa-${siswa.siswa_id}`}>
//                         <TableCell>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{index + 1}</Typography>
//                         </TableCell>
//                         <TableCell align='center'>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{siswa.nama_siswa}</Typography>
//                         </TableCell>
//                         <TableCell align='center'>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{siswa.kehadiran}</Typography>
//                         </TableCell>
//                         <TableCell align='center'>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{siswa.sakit}</Typography>  
//                         </TableCell>
//                         <TableCell align='center'>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{siswa.izin}</Typography>
//                         </TableCell>
//                         <TableCell align='center'>
//                           <Typography sx={{ fontSize: '0.90rem'}}>{siswa.alpa}</Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//             <Grid container spacing={2} justifyContent="flex-start" mt={2}>
//             <Grid item>
//               <Button 
//                 onClick={closeModal} 
//                 variant="outlined" 
//                 color="secondary"
//               >
//                 Tutup
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 onClick={handleDownloadPDF}
//                 variant="contained" 
//                 color="primary"
//                 disabled={!startDate || !endDate}
//               >
//                 Download PDF
//               </Button>
//             </Grid>
//           </Grid>
//           </DialogContent>
//         </Dialog>
//       </ParentCard>
//     </PageContainer>
//   );
// };

// export default RekapAbsensiList;
