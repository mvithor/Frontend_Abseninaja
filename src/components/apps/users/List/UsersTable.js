import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment'; // Import moment
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

const UsersTable = ({
    users,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    return (
        <Paper variant="outlined">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Email</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Dibuat</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Diperbarui</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Akses</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                        ).map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{user.name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{user.email}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{moment(user.created_at).format('YYYY-MM-DD')}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{moment(user.updated_at).format('YYYY-MM-DD')}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{user.role_name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <Tooltip title="Edit" placement="bottom">
                                            <IconButton onClick={() => handleEdit(user.id)}>
                                                <IconPencil width={18} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hapus" placement="bottom">
                                            <IconButton onClick={() => handleDelete(user.id)}>
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
                                count={users.length}
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

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default UsersTable;
