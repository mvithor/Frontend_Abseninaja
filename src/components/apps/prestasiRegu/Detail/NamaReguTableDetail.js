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
import TablePaginationActions from '../../siswa/siswaList/TablePaginationAction';

const NamaReguTableDetail = ({
    prestasiRegu = [],
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prestasiRegu.length) : 0;

    return (
        <Paper variant='outlined'>
            <TableContainer>
                <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Siswa</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tingkat</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Juara</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Penyelenggara</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Keterangan</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? prestasiRegu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : prestasiRegu
                        ).map((prestasi, index) => (
                            <TableRow key={prestasi.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.student_name || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.nama_tingkatan || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.nama_juara || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.penyelenggara || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.keterangan || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <Tooltip title="Edit" placement="bottom">
                                            <IconButton onClick={() => handleEdit(prestasi.id)}>
                                                <IconPencil width={18} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hapus" placement="bottom">
                                            <IconButton onClick={() => handleDelete(prestasi.regu_id, prestasi.student_id)}>
                                                <IconTrash width={18} />
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
                                count={prestasiRegu.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
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

NamaReguTableDetail.propTypes = {
    prestasiRegu: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default NamaReguTableDetail;
