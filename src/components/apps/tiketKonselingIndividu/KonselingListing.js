import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
} from '@mui/material';
import {
  fetchKonselingIndividu,
  deleteKonselingIndividu,
  searchKonseling,
  getVisibleKonseling,
  setEditingItem
} from 'src/store/apps/tiketKonseling/TiketKonselingIndividuSlice';
import { IconTrash, IconEdit } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const KonselingListing = ({ studentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchKonselingIndividu(studentId));
  }, [dispatch, studentId]);

  const konselingIndividu = useSelector((state) => getVisibleKonseling(state));

  // Cek apakah konselingIndividu adalah array
  console.log('konselingIndividu:', Array.isArray(konselingIndividu), konselingIndividu);

  const handleEdit = (item) => {
    dispatch(setEditingItem(item)); // Simpan item yang sedang diedit
    navigate(`/dashboard/admin/tiket-konseling-individu/konseling-edit/${item.id}`); // Arahkan ke halaman edit dengan ID item
  };

  return (
    <Box mt={4}>
      <Box sx={{ maxWidth: '260px', ml: 'auto' }} mb={3}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(searchKonseling(e.target.value))}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Siswa</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Judul Pengaduan</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Deskripsi</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Diajukan</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Dijadwalkan</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(konselingIndividu) && konselingIndividu.map((item, index) => (
              <TableRow key={item.id} hover>
                <TableCell sx={{ fontSize: '1rem' }}>{index + 1}</TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{item.student_name}</Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {item.judul_pengaduan}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ maxWidth: 200, overflow: 'auto' }}>
                  <Typography
                    sx={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
                  >
                    {item.deskripsi_permasalahan}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor:
                        item.status_konseling === 'Diajukan'
                          ? (theme) => theme.palette.warning.light
                          : item.status_konseling === 'Disetujui'
                            ? (theme) => theme.palette.info.light
                            : item.status_konseling === 'Ditolak'
                              ? (theme) => theme.palette.error.light
                              : item.status_konseling === 'Selesai'
                                ? (theme) => theme.palette.success.light
                                : '',
                    }}
                    size="small"
                    label={item.status_konseling}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{item.created_at}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{item.request_date}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Konseling">
                    <IconButton onClick={() => handleEdit(item)}>
                      <IconEdit size="18" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Konseling">
                    <IconButton onClick={() => dispatch(deleteKonselingIndividu(item.id))}>
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent={'center'}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default KonselingListing;
