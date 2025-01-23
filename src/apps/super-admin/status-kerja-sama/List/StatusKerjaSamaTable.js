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
  TableContainer,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import TablePaginationActions from 'src/components/table-paginations-action/TablePagination';

const StatusKerjaSamaTable = ({
    status,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDelete, 
    handleEdit,
    isLoading,
    isError,
    errorMessage
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - status.length) : 0;

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
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status Kerja Sama</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: '100px' 
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : isError ? (
                        // Tampilkan error jika ada masalah
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: '100px'
                                    }}
                                >
                                    <Typography color="error" variant="h6">
                                        {errorMessage}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        // Tampilkan data jika tidak sedang loading atau error
                        (rowsPerPage > 0
                        ? status.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : status
                        ).map((statusKerjaSama, index) => (
                        <TableRow key={statusKerjaSama.id}>
                        <TableCell>
                            <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography sx={{ fontSize: '1rem' }}>{statusKerjaSama.status_kerja_sama}</Typography>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Tooltip title="Edit" placement="bottom">
                                <IconButton onClick={() => handleEdit(statusKerjaSama.id)}>
                                <IconEdit width={18} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Hapus" placement="bottom">
                                <IconButton onClick={() => handleDelete(statusKerjaSama.id)}>
                                <IconTrash width={18} />
                                </IconButton>
                            </Tooltip>
                            </Box>
                        </TableCell>
                        </TableRow>
                        ))
                    )}
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
                            count={status.length}
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

StatusKerjaSamaTable.propTypes = {
    status: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired, 
    isError: PropTypes.bool.isRequired, 
    errorMessage: PropTypes.string 
};

export default StatusKerjaSamaTable;
