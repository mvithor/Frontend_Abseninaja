import React from 'react';
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
  TableContainer,
  Paper
} from '@mui/material';
import TablePaginationActions from 'src/components/apps/siswa/siswaList/TablePaginationAction';

const CatatanKonselingTable = ({
    catatanKonseling,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - catatanKonseling.length) : 0;

    return (
        <Paper variant="outlined">
            <TableContainer>
                <Table aria-label ="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Judul Konseling</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Deskripsi Permasalahan</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Arahan</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Tindak Lanjut</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? catatanKonseling.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : catatanKonseling
                        ).map((catatan, index) => {
                            return (
                                <TableRow key={`${catatan.id}-${index}`}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{catatan.judul_pengaduan}</Typography>
                                    </TableCell>
                                    <TableCell align='center' style={{ maxWidth: 200, overflow: 'auto' }}>
                                        <Typography sx={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>
                                            {catatan.deskripsi_permasalahan}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' style={{ maxWidth: 200, overflow: 'auto' }}>
                                        <Typography sx={{ fontSize: '1rem', whiteSpace: 'nowrap'  }}>
                                            {catatan.arahan}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' style={{ maxWidth: 200, overflow: 'auto' }}>
                                        <Typography sx={{ fontSize: '1rem', whiteSpace: 'nowrap'  }}>
                                            {catatan.tindak_lanjut}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={catatanKonseling.length}
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

CatatanKonselingTable.propTypes = {
    catatanKonseling: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default CatatanKonselingTable;