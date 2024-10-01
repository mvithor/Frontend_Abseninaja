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
import { IconPencil, IconTrash } from '@tabler/icons';
import TablePaginationActions from "../../siswa/siswaList/TablePaginationAction";

const WaliKelasTable = ({
    waliKelas,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
}) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - waliKelas.length) : 0;

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
                                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nama</Typography>
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
                    <TableBody>
            {(rowsPerPage > 0
              ? waliKelas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : waliKelas
            ).map((wali, index) => (
              <TableRow key={wali.id}>
              <TableCell>
                <Typography sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{wali.name}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{wali.alamat}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{wali.nomor_telepon}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontSize: '1rem' }}>{wali.jabatan}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton onClick={() => handleEdit(wali.id)}>
                      <IconPencil width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hapus" placement="bottom">
                    <IconButton onClick={() => handleDelete(wali.id)}>
                      <IconTrash width={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
            ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
            <TableFooter>
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={waliKelas.length}
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

WaliKelasTable.propTypes = {
    waliKelas: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default WaliKelasTable;