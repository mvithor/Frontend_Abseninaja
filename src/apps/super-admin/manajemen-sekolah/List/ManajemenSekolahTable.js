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
import { IconEye, IconEdit, IconTrash } from '@tabler/icons';
import TablePaginationActions from 'src/components/table-paginations-action/TablePagination';

const ManajemenSekolahTable = ({
    sekolah,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDetail,
    handleDelete, 
    handleEdit,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sekolah.length) : 0;

    return (
        <Paper variant='outlined'>
            <TableContainer>
                <Table aria-label='custom pagination table'>
                    <TableHead>
                    <TableRow>
                    <TableCell>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Sekolah</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>NPSN</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Alamat</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                    </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
            {(rowsPerPage > 0
              ? sekolah.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sekolah
            ).map((manajemenSekolah, index) => (
              <TableRow key={manajemenSekolah.id}>
              <TableCell>
                <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{manajemenSekolah.nama}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{manajemenSekolah.npsn}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{manajemenSekolah.alamat}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{manajemenSekolah.status}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Tooltip title="Lihat" placement="bottom">
                    <IconButton onClick={() => handleDetail(manajemenSekolah.id)}>
                      <IconEye width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton onClick={() => handleEdit(manajemenSekolah.id)}>
                      <IconEdit width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hapus" placement="bottom">
                    <IconButton onClick={() => handleDelete(manajemenSekolah.id)}>
                      <IconTrash width={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
            ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={sekolah.length}
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

ManajemenSekolahTable.propTypes = {
    sekolah: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ManajemenSekolahTable;
