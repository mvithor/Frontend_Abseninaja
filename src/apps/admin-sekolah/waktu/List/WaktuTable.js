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

const WaktuTable = ({
    waktu,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
    isLoading,
    isError,
    errorMessage,
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
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jam Mulai</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Jam Selesai</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Kategori</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Hari</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Aksi</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minHeight: '100px',
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minHeight: '100px',
                                        }}
                                    >
                                        <Typography color="error" variant="h6">
                                            {errorMessage}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : waktu.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            minHeight: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="h6">
                                            Tidak ada waktu tersedia
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            (rowsPerPage > 0
                                ? waktu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : waktu
                            ).map((waktuSekolah, index) => (
                                <TableRow key={waktuSekolah.id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            {page * rowsPerPage + index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            {waktuSekolah.jam_mulai || 'Tidak ditemukan'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            {waktuSekolah.jam_selesai || 'Tidak ditemukan'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            {waktuSekolah.kategori_waktu || 'Tidak ditemukan'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            {waktuSekolah.hari || 'Tidak ditemukan'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100%',
                                            }}
                                        >
                                            <Tooltip title="Edit" placement="bottom">
                                                <IconButton onClick={() => handleEdit(waktuSekolah.id)}>
                                                    <IconEdit width={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Hapus" placement="bottom">
                                                <IconButton onClick={() => handleDelete(waktuSekolah.id)}>
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
                                colSpan={6}
                                count={waktu.length}
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

WaktuTable.propTypes = {
    waktu: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

export default WaktuTable;