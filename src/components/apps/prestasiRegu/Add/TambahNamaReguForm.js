import React, { useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment
} from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconBuildingCommunity } from '@tabler/icons'; 

const TambahNamaReguForm = ({setSuccess, setError}) => {
    const [namaRegu, setNamaRegu] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setNamaRegu(event.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
           const response =  await axiosInstance.post('/prestasi-regu/tambah-regu', {
                nama_regu: namaRegu
            });
            setSuccess(response.data.msg);
            setError("")
            setTimeout(() => navigate('/dashboard/admin/prestasi/regu'), 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Terjadi kesalahan:", error.response.data);
                setError(error.response.data.msg);
              } else {
                  console.error("Terjadi kesalahan:", error.message);
                  setError("Terjadi kesalahan saat menambahkan prestasi");
              }
              setSuccess("");
              } finally {
                  setIsLoading(false);
                  setTimeout(() => {
                      setError("");
                      setSuccess("");
                  }, 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="namaRegu" sx={{ mt: 0, mb: 1 }}>
                    Nama Tim
                    </CustomFormLabel>
                </Box>
                <CustomOutlinedInput
                    startAdornment={<InputAdornment position="start"><IconBuildingCommunity /></InputAdornment>}
                    id="namaRegu"
                    name="namaRegu"
                    value={namaRegu}
                    onChange={handleChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                    <SubmitButton isLoading={isLoading}/>
                    <CancelButton onClick={handleCancel}>Batal</CancelButton>
                </Grid>
            </Grid>
        </form>
    )
}

export default TambahNamaReguForm;