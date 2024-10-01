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
} from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from '../../siswa/siswaList/TablePaginationAction';

const KategoriPoinTable = ({
    poin,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDelete, 
    handleEdit 
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - poin.length) : 0;

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
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Kategori Poin</Typography>
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
                    ).map((kategoriPoin, index) => (
                    <TableRow key={kategoriPoin.id}>
                    <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography sx={{ fontSize: '1rem' }}>{kategoriPoin.nama_kategori}</Typography>
                    </TableCell>
                    <TableCell>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Tooltip title="Edit" placement="bottom">
                            <IconButton onClick={() => handleEdit(kategoriPoin.id)}>
                            <IconPencil width={18} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus" placement="bottom">
                            <IconButton onClick={() => handleDelete(kategoriPoin.id)}>
                            <IconTrash width={18} />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    </TableCell>
                    </TableRow>
                    ))}
                    {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={3} />
                        </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
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

KategoriPoinTable.propTypes = {
    poin: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default KategoriPoinTable;