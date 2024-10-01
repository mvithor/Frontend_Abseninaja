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
  Paper,
  Box
} from '@mui/material';
import TablePaginationActions from 'src/components/apps/siswa/siswaList/TablePaginationAction';
import moment from 'moment';

const colors = {
    Diajukan: 'warning.main',
    Disetujui: 'info.main',
    Ditolak: 'error.main',
    Selesai: 'success.main',
  };

const KonsultasiTable = ({
    konsultasiWaliSiswa ,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    statusKonselingOptions
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - konsultasiWaliSiswa.length) : 0;

    const getStatusKonseling = (statusKonseling) => {
        const status = statusKonselingOptions.find(option => option.status_konseling === statusKonseling);
        return status ? status.status_konseling : 'Status Tidak Ditemukan';
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanggal Tidak Ditemukan';
        return moment(dateString).format('DD MMM YYYY, HH:mm');
    }

    return (
        <Paper variant='outlined'>
            <TableContainer>
                <Table aria-label="custom pagination table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Topik Konsultasi</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Pelaksana dituju</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jadwal</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status</Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? konsultasiWaliSiswa.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : konsultasiWaliSiswa
                        ).map((konsultasiWs, index) => {
                            const statusColor = colors[konsultasiWs.status_konseling] || 'default';
                            return (
                                <TableRow key={konsultasiWs.id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{konsultasiWs.topik}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{konsultasiWs.pelaksana_dituju}</Typography>
                                    </TableCell>
                                    
                                    <TableCell align='center'>
                                        <Typography sx={{ fontSize: '1rem' }}>{formatDate(konsultasiWs.request_date)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Box 
                                            sx={{
                                                backgroundColor: statusColor,
                                                color: 'background.paper',
                                                padding: '4px 8px',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '1rem' }}>
                                                {getStatusKonseling(konsultasiWs.status_konseling)}
                                            </Typography>
                                        </Box>
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
                                count={konsultasiWaliSiswa.length}
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

KonsultasiTable.propTypes = {
    konsultasiWaliSiswa: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    statusKonselingOptions: PropTypes.array.isRequired
};

export default KonsultasiTable;