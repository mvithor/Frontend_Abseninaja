import React from 'react';
import DashboardCard from '../shared/DashboardCard';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
  Stack,
} from '@mui/material';
import TopPerformerData from './TopPerformerData';

const performers = TopPerformerData;

const TopPerformers = () => {
  // for select
  const [month, setMonth] = React.useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title="Papan Peringkat"
      subtitle="Siswa Terbaik"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2022</MenuItem>
          <MenuItem value={2}>April 2022</MenuItem>
          <MenuItem value={3}>May 2022</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>Nama Siswa</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>Kategori</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>Total Poin</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performers.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell align='center'>
                  <Stack direction="row" spacing={2}>
                    <Avatar src={basic.imgsrc} alt={basic.imgsrc} sx={{ width: 40, height: 40 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {basic.name}
                      </Typography>
                      <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                        {basic.post}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align='center'>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="subtitle2">{basic.budget}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopPerformers;
