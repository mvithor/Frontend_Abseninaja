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

const UserAdminTable = ({
    userAdmin,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
    isLoading,
    isError,
    errorMessage
}) => {

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
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Email</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Diperbarui</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {isLoading ? (
                        <TableRow>
                        <TableCell colSpan={5}>
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
                        <TableRow>
                        <TableCell colSpan={5}>
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
                    ) : userAdmin.length === 0 ? (  
                        <TableRow>
                        <TableCell colSpan={5}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%', 
                                minHeight: '100px', 
                                textAlign: 'center' 
                            }}
                            >
                            <Typography variant="h6">
                                Tidak ada pengguna admin ditemukan
                            </Typography>
                            </Box>
                        </TableCell>
                        </TableRow>
                    ) : (
                        (rowsPerPage > 0
                        ? userAdmin.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : userAdmin
                        ).map((adminUser, index) => (
                        <TableRow key={adminUser.user_id || index}>
                            <TableCell>
                                <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography sx={{ fontSize: '1rem' }}>{adminUser.name}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography sx={{ fontSize: '1rem' }}>{adminUser.email}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography sx={{ fontSize: '1rem' }}>{adminUser.updated_at || 'Tidak Ada'}</Typography>
                            </TableCell>
                            <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Tooltip title="Edit" placement="bottom">
                                <IconButton onClick={() => handleEdit(adminUser.user_id)}>
                                    <IconEdit width={18} />
                                </IconButton>
                                </Tooltip>
                                <Tooltip title="Hapus" placement="bottom">
                                <IconButton onClick={() => handleDelete(adminUser.user_id)}>
                                    <IconTrash width={18} />
                                </IconButton>
                                </Tooltip>
                            </Box>
                            </TableCell>
                        </TableRow>
                        ))
                    )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={userAdmin.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="Rows per page:"
                        />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

UserAdminTable.propTypes = {
    userAdmin: PropTypes.array.isRequired,
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

export default UserAdminTable;