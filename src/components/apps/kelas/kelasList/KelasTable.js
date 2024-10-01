import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  TableHead,
  Table,
  TableBody,
  Tooltip,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Paper,
  TableContainer,
  Box,
} from '@mui/material';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from '../../siswa/siswaList/TablePaginationAction';

const KelasTable = ({ 
  kelas,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleDetail,
  handleDelete, 
  handleEdit,
  waliKelasOptions 
  }) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - kelas.length) : 0;

    const getWaliKelasName = (waliKelasId) => {
      const waliKelas = waliKelasOptions.find(option => option.id === waliKelasId);
      return waliKelas ? waliKelas.name : '';
    }

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
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Kelas</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Wali Kelas</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? kelas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : kelas
            ).map((kelas, index) => (
              <TableRow key={kelas.id}>
              <TableCell>
                <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{kelas.nama_kelas}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{getWaliKelasName(kelas.wali_kelas_id)}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Tooltip title="Lihat" placement="bottom">
                    <IconButton onClick={() => handleDetail(kelas.id)}>
                      <IconEye width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton onClick={() => handleEdit(kelas.id)}>
                      <IconPencil width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hapus" placement="bottom">
                    <IconButton onClick={() => handleDelete(kelas.id)}>
                      <IconTrash width={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
            ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={kelas.length}
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

KelasTable.propTypes = {
  kelas: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleDetail: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  waliKelasOptions: PropTypes.array.isRequired
};

export default KelasTable;