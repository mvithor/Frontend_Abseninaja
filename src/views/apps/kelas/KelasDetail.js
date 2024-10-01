import React, { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button
} from "@mui/material";
import BreadcrumbKelasDetail from "src/components/apps/kelas/kelasDetail/BreadcrumbKelasDetail";
import Alerts from "src/components/alerts/Alerts";
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import KelasTableDetail from "src/components/apps/kelas/kelasDetail/KelasTableDetail";

const KelasDetailList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const responseStudent = await axiosInstance.get(`/kelas/detail/${id}`);
        setStudents(responseStudent.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          setError(error.response.data.msg);
        } else {
          setError("Terjadi kesalahan saat memuat data");
        }
      } finally {
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };

    fetchStudents();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.student_name && student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="Detail Kelas" description="Detail kelas">
      <BreadcrumbKelasDetail />
      <Alerts error={error}/>
      <ParentCard title="Detail Kelas">
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            maxWidth: '160px',
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              sx: { padding: '4px' },
            }}
          />
        </Box>
       
          <KelasTableDetail
            students={filteredStudents}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={setPage}
            handleChangeRowsPerPage={setRowsPerPage}
          />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
          <Button
            sx={{
              backgroundColor: "#2F327D",
              '&:hover': { backgroundColor: "#280274" }
            }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={handleCancel}
          >
            Kembali
          </Button>
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default KelasDetailList;
