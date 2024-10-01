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
import { IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from './TablePaginationAction';

export default function StudentTable({
  students,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleEdit,
  handleDelete,
}) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const parsingGender = (genderId) => {
    if (genderId === 1) return 'Laki-Laki';
    if (genderId === 2) return 'Perempuan';
    return 'Tidak Diketahui';
  };

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tanggal Lahir</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jenis Kelamin</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Kelas</Typography> 
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Alamat</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : students
            ).map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{student.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{student.tanggal_lahir}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{parsingGender(student.jenis_kelamin_id)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{student.kelas_nama}</Typography> 
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '1rem' }}>{student.alamat}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton onClick={() => handleEdit(student.id)}>
                        <IconPencil width={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus" placement="bottom">
                      <IconButton onClick={() => handleDelete(student.id)}>
                        <IconTrash width={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={7}
                count={students.length}
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
}

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
