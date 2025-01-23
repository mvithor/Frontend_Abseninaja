import {
    Typography,
    Box,
    TableHead,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableFooter,
    TableContainer,
    Paper,
    CircularProgress,
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import TablePaginationActions from 'src/components/table-paginations-action/TablePagination';
  
  const AbsensiTable = ({
    absensi,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    isLoading,
    isError,
    errorMessage,
  }) => {
    return (
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">No</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Nama</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Tanggal</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Jam Masuk</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Jam Keluar</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Status</Typography>
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
              ) : absensi.length === 0 ? (
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
                        Tidak ada data absensi yang tersedia
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                absensi
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={`${item.nama}-${item.tanggal}-${index}`}>
                      <TableCell>
                        <Typography sx={{ fontSize: '1rem' }}>
                          {page * rowsPerPage + index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: '1rem' }}>{item.nama}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: '1rem' }}>{item.tanggal}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: '1rem' }}>
                          {item.jam_masuk || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: '1rem' }}>
                          {item.jam_pulang || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                      <Box
                        sx={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            backgroundColor:
                            item.status_kehadiran === 'Masuk'
                                ? '#DFFFE0'
                                : item.status_kehadiran === 'Pulang'
                                ? '#FFE0E0'
                                : item.status_kehadiran === 'Izin'
                                ? '#FFF6D5'
                                : item.status_kehadiran === 'Sakit'
                                ? '#DDEEFF'
                                : item.status_kehadiran === 'Alpa'
                                ? '#F5D0C5'
                                : '#F5F5F5',
                            color:
                            item.status_kehadiran === 'Masuk'
                                ? '#008000'
                                : item.status_kehadiran === 'Pulang'
                                ? '#FF0000'
                                : item.status_kehadiran === 'Izin'
                                ? '#FFD700'
                                : item.status_kehadiran === 'Sakit'
                                ? '#0000FF'
                                : item.status_kehadiran === 'Alpa'
                                ? '#FF4500'
                                : '#000000',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            textAlign: 'center',
                        }}
                        >
                        {item.status_kehadiran}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={absensi.length}
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
  
  AbsensiTable.propTypes = {
    absensi: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  };
  
  export default AbsensiTable;
  