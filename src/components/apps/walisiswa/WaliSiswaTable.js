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
  Paper,
  TableContainer,
} from '@mui/material';
import TablePaginationActions from '../siswa/siswaList/TablePaginationAction';

const WaliSiswaTable = ({
    wali, 
    page,
    rowsPerPage,
    statusOptions,
    handleChangePage,
    handleChangeRowsPerPage,

}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wali.length) : 0;
    
    const getStatusKeluarga = (statusKeluargaId) => {
        if (!statusOptions || statusOptions.length === 0) return '';  // Handle jika statusOptions belum terisi
        const status = statusOptions.find(option => option.id === statusKeluargaId);
        return status ? status.nama_status : 'Status tidak ditemukan';
    }
    

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
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Anak</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>NIK</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Pekerjaan</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Alamat</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Telepon</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Status Keluarga</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? wali.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : wali
                        ).map((waliSiswa, index) => (
                            <TableRow key={waliSiswa.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.wali_name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.student_name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.nik}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.pekerjaan}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.alamat}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{waliSiswa.nomor_telepon}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{getStatusKeluarga(waliSiswa.status_keluarga_id)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={8}
                            count={wali.length}
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

WaliSiswaTable.propTypes = {
    wali: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    statusOptions: PropTypes.array.isRequired
};

export default WaliSiswaTable;


