import React from "react";
import PropTypes from 'prop-types';
import {
    Typography,
    TableHead,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableFooter,
    Paper,
    TableContainer,
} from '@mui/material';
import TablePaginationActions from "src/components/apps/siswa/siswaList/TablePaginationAction";

const PoinSiswaTable = ({
    poin = [],
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
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
    };

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
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Total Poin</Typography>
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
                                    <TableCell align='left'>
                                        <Typography sx={{ fontSize: '1rem' }}>{getStudentName(poinSiswa.student_id)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{getKategoriName(poinSiswa.kategori_poin_id)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{poinSiswa.total_points}</Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
                            colSpan={4}
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
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

PoinSiswaTable.propTypes = {
    poin: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    studentOptions: PropTypes.array.isRequired,
    kategoriPoinOptions: PropTypes.array.isRequired
};

export default PoinSiswaTable;