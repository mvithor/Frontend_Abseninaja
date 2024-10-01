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
import { IconEye, IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from '../../siswa/siswaList/TablePaginationAction';

const LayananKonselingTable = ({ 
    data, 
    page, 
    rowsPerPage, 
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete }) => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tanggal</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Permasalahan</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Arahan</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tindak Lanjut</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Bidang Bimbingan</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.nama_siswa}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.tanggal}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.permasalahan}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.arahan}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.tindak_lanjut}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontSize: '1rem' }}>{item.bidang_bimbingan}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton onClick={() => handleEdit(item.id)}>
                        <IconPencil width={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus" placement="bottom">
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <IconTrash width={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={8}
                count={data.length}
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

LayananKonselingTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama_siswa: PropTypes.string.isRequired,
      tanggal: PropTypes.string.isRequired,
      permasalahan: PropTypes.string,
      arahan: PropTypes.string,
      tindak_lanjut: PropTypes.string,
      bidang_bimbingan: PropTypes.string,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default LayananKonselingTable;
