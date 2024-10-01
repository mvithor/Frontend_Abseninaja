import React from "react";
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
import TablePaginationActions from "../../siswa/siswaList/TablePaginationAction";

const WaliKelasWithKelasTable = ({
    walikelasWithKelas,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - walikelasWithKelas.length) : 0;

    return (
        <Paper variant="outlined">
            <TableContainer>
                <Table aria-label="custom pagination table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>No</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama Siswa</Typography>
                         </TableCell>
                         <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Alamat</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nomor Telepon</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jabatan</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
            </TableContainer>

        </Paper>
    )
}