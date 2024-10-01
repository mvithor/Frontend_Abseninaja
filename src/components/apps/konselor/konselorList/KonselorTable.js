import React from "react";
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
import TablePaginationActions from "../../siswa/siswaList/TablePaginationAction";

const KonselorTable = ({
    konselor,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - konselor.length) : 0;

    return (
        <Paper variant="outlined">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Email</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Bidang</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Telepon</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                    ? konselor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : konselor
                     ).map((konselor, index) => (
                    <TableRow key={konselor.id}>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{konselor.nama}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{konselor.email}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{konselor.bidang}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{konselor.nomor_telepon}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{konselor.status_aktif ? 'Aktif' : 'Tidak Aktif'}</Typography>
                    </TableCell>
                    <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Tooltip title="Hapus" placement="bottom">
                       <IconButton onClick={() => handleDelete(konselor.id)}>
                          <IconTrash width={18} />
                       </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" placement="bottom">
                       <IconButton onClick={() => handleEdit(konselor.id)}>
                          <IconPencil width={18} />
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
                             count={konselor.length}
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

KonselorTable.propTypes = {
    konselor: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default KonselorTable;