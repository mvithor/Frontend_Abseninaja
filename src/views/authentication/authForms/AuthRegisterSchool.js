import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from '@mui/material';
import { useMutation } from "@tanstack/react-query";
import Alerts from "src/components/alerts/Alerts";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";

const AuthRegisterSchool = ({ title, subtitle, subtext }) => {
    const [namaAdmin, setNamaAdmin] = useState('');
    const [nama, setNama] = useState('');
    const [npsn, setNpsn] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kontakAdmin, setKontakAdmin] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Penanganan mutation (POST request)
    const mutation = useMutation(
        async (newSchool) => {
            return await axios.post('http://localhost:4000/api/v1/pendaftaran', newSchool);
        },
        {
            onSuccess: () => {
                setSuccess('Pendaftaran berhasil, admin akan menghubungi Anda secepatnya.');
                setNamaAdmin('');
                setNama('');
                setNpsn('');
                setAlamat('');
                setKontakAdmin('');
                setError('');
                setTimeout(() => {
                    setSuccess('');  // Clear success message after 3 seconds
                }, 3000);
            },
            onError: (error) => {
                if (error.response) {
                    setError(error.response.data.msg || 'Terjadi kesalahan saat mendaftar.');
                } else {
                    setError('Terjadi kesalahan. Silakan coba lagi.');
                }
            }
        }
    );

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validasi input sebelum mengirim request
        if (!namaAdmin || !nama || !npsn || !alamat || !kontakAdmin) {
            setError('Semua field wajib diisi.');
            return;
        }

        if (!/^\d{8}$/.test(npsn)) {
            setError('NPSN harus berupa angka 8 digit.');
            return;
        }

        if (!/^\+?\d{10,15}$/.test(kontakAdmin)) {
            setError('Kontak admin harus berupa nomor telepon valid.');
            return;
        }

        // Jika validasi sukses, lakukan request
        mutation.mutate({
            namaAdmin,
            nama,
            npsn,
            alamat,
            kontakAdmin,
        });
    };

    return (
        <>
            <Typography fontWeight="700" variant="h4" mb={1}>
                <Alerts error={error} success={success} />
                {title}
            </Typography>
            {subtext}
            <Box component="form" onSubmit={handleRegister}>
                <Stack mb={3}>
                    <CustomFormLabel htmlFor="nama_admin">Nama Lengkap Admin</CustomFormLabel>
                    <CustomTextField
                        id="nama_admin"
                        variant="outlined"
                        placeholder="Nama Lengkap"
                        fullWidth
                        value={namaAdmin}
                        onChange={(e) => setNamaAdmin(e.target.value)}
                        required
                        autoComplete="nama_admin"
                    />
                    <CustomFormLabel htmlFor="nama">Nama Sekolah</CustomFormLabel>
                    <CustomTextField
                        id="nama"
                        variant="outlined"
                        placeholder="Nama Sekolah"
                        fullWidth
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        autoComplete="nama"
                    />
                    <CustomFormLabel htmlFor="npsn">NPSN</CustomFormLabel>
                    <CustomTextField
                        id="npsn"
                        variant="outlined"
                        placeholder="Nomor Pokok Sekolah Nasional (NPSN)"
                        fullWidth
                        value={npsn}
                        onChange={(e) => setNpsn(e.target.value)}
                        required
                        autoComplete="npsn"
                    />
                    <CustomFormLabel htmlFor="alamat">Alamat</CustomFormLabel>
                    <CustomTextField
                        id="alamat"
                        variant="outlined"
                        placeholder="Alamat Sekolah"
                        fullWidth
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                        autoComplete="alamat"
                    />
                    <CustomFormLabel htmlFor="kontak_admin">Kontak Admin</CustomFormLabel>
                    <CustomTextField
                        id="kontak_admin"
                        variant="outlined"
                        placeholder="Nomor Telepon Admin"
                        fullWidth
                        value={kontakAdmin}
                        onChange={(e) => setKontakAdmin(e.target.value)}
                        required
                        autoComplete="kontak_admin"
                    />
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ color: 'white' }}
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{
                        backgroundColor: "#F48C06",
                        '&:hover': { backgroundColor: "#2F327D" },
                    }}
                >
                    Daftar
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegisterSchool;
