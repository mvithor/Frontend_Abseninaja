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


const NamaReguTable = ({
    regu,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDetail,
    handleDelete, 
    handleEdit 
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - regu.length) : 0;

    return (
        <Paper variant='outlined'>
            <TableContainer>
                <Table>
                <TableHead>
                <TableRow>
                <TableCell>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                </TableCell>
                <TableCell align='center'>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Tim</Typography>
                </TableCell>
                <TableCell align="center">
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? regu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : regu
            ).map((regu, index) => (
              <TableRow key={regu.id}>
              <TableCell>
                <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{regu.nama_regu}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Tooltip title="Lihat" placement="bottom">
                    <IconButton onClick={() => handleDetail(regu.id)}>
                      <IconEye width={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton onClick={() => handleEdit(regu.id)}>
                      <IconPencil width={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hapus" placement="bottom">
                    <IconButton onClick={() => handleDelete(regu.id)}>
                      <IconTrash width={18} />
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
                        colSpan={3}
                        count={regu.length}
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

NamaReguTable.propTypes = {
    regu: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default NamaReguTable;


