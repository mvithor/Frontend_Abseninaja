import React from "react";
import PropTypes from 'prop-types';
import {
    Typography,
    TableHead,
    Table,
    TableBody,
    Box,
    Tooltip,
    IconButton,
    TableCell,
    TablePagination,
    TableRow,
    TableFooter,
    Paper,
    TableContainer,
} from '@mui/material';
import TablePaginationActions from "src/components/apps/siswa/siswaList/TablePaginationAction";
import moment from "moment";
import { IconTrash } from '@tabler/icons';

const LogPoinSiswaTable = ({
    poin = [],
    page,
    rowsPerPage,
    handleDelete,
    handleChangePage,
    handleRowsPerPageChange,
    kategoriPoinOptions,
    studentOptions
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - poin.length) : 0;

    const getStudentName = (studentId) => {
        const student = studentOptions.find(option => option.id === studentId);
        return student ? student.name : '';
    };

    const getKategoriName = (kategoriPoinId) => {
        const kategoriPoin = kategoriPoinOptions.find(option => option.id === kategoriPoinId);
        return kategoriPoin ? kategoriPoin.nama_kategori : '';
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanggal Tidak Ditemukan';
        return moment(dateString).format('DD MMM YYYY');
    }

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
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Siswa</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Kategori</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Poin</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Deskripsi</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tanggal</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? poin.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : poin
                        ).map((poinSiswa, index) => {
                            return (
                                <TableRow key={`${poinSiswa.id}-${index}`}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{getStudentName(poinSiswa.student_id)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{getKategoriName(poinSiswa.kategori_poin_id)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{poinSiswa.points}</Typography>
                                    </TableCell>
                                    <TableCell align='center' style={{ maxWidth: 200, overflow: 'auto' }}>
                                        <Typography sx={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>
                                            {poinSiswa.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{formatDate(poinSiswa.date)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Tooltip title="Hapus" placement="bottom">
                                        <IconButton onClick={() => handleDelete(poinSiswa.id)}>
                                        <IconTrash width={18} />
                                        </IconButton>
                                    </Tooltip>
                                    </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
    count={poin.length} // Hitung jumlah total data
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleRowsPerPageChange}
    ActionsComponent={TablePaginationActions}
/>

                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={7}
                            count={poin.length}
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
                            /> */}
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

LogPoinSiswaTable.propTypes = {
    poin: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    studentOptions: PropTypes.array.isRequired,
    kategoriPoinOptions: PropTypes.array.isRequired

};

export default LogPoinSiswaTable;