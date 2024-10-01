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

const PrestasiIndividuSiswaTable = ({
    prestasiIndividu = [],
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    tingkatanOptions,
    juaraOptions,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prestasiIndividu.length) : 0;

    const getTingkatName = (tingkatId) => {
        const tingkat = tingkatanOptions.find(option => option.id === tingkatId);
        return tingkat ? tingkat.nama_tingkatan : '';
    };

    const getJuaraName = (juaraId) => {
        const juara = juaraOptions.find(option => option.id === juaraId);
        return juara ? juara.nama_juara : '';
    };

    return (
        <Paper variant="outlined">
            <TableContainer>
                <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Prestasi</Typography>
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
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                            ? prestasiIndividu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : prestasiIndividu
                        ).map((prestasi, index) => (
                            <TableRow key={prestasi.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.keterangan}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{getTingkatName(prestasi.tingkat_id)}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{getJuaraName(prestasi.juara_id)}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography sx={{ fontSize: '1rem' }}>{prestasi.penyelenggara}</Typography>
                                </TableCell>
                             
                            </TableRow>
                        ))}
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
                                count={prestasiIndividu.length}
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

PrestasiIndividuSiswaTable.propTypes = {
    prestasiIndividu: PropTypes.array,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    tingkatanOptions: PropTypes.array.isRequired,
    juaraOptions: PropTypes.array.isRequired,
};

export default PrestasiIndividuSiswaTable;
