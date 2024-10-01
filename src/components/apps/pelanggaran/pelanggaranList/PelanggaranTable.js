import React from 'react';
import {
  Box,
  Typography,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableFooter,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import { IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from '../../siswa/siswaList/TablePaginationAction';

const PelanggaranTable = ({ 
    pelanggaran, 
    page, 
    rowsPerPage, 
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    // handleDetail,
    handleDelete }) => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pelanggaran.length) : 0;

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Siswa</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jenis Kelamin</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Waktu</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Peristiwa</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tempat</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Informan</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Bidang Bimbingan</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? pelanggaran.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : pelanggaran
            ).map((pelanggaranItem, index) => (
              <TableRow key={pelanggaranItem.id}>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.nama_siswa}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.jenis_kelamin}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.waktu}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.peristiwa}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.tempat}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.informan}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{pelanggaranItem.bidang_bimbingan}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {/* <Tooltip title="Lihat" placement="bottom">
                      <IconButton onClick={() => handleDetail(pelanggaranItem.id)}>
                        <IconEye width={20} />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton onClick={() => handleEdit(pelanggaranItem.id)}>
                        <IconPencil width={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus" placement="bottom">
                      <IconButton onClick={() => handleDelete(pelanggaranItem.id)}>
                        <IconTrash width={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={pelanggaran.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

PelanggaranTable.propTypes = {
  pelanggaran: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama_siswa: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  // handleDetail: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default PelanggaranTable;
