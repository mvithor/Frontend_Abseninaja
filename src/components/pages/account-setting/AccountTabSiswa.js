import React, { useState, useEffect } from 'react';
import { Box, Avatar, Button, Stack, Alert } from '@mui/material';
import { useSelector } from 'react-redux'; 
import axiosInstance from 'src/utils/axiosInstance';

const AccountTab = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('default_image_url');
    const [uploadMessage, setUploadMessage] = useState('');
    const userId = useSelector(state => state.user.userId); 

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axiosInstance.get(`/profile/current-image/${userId}`);
                setImageUrl(response.data.url);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        if (userId) {
            fetchProfileImage();
        }
    }, [userId]);

    // Function untuk memilih file
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImageUrl(URL.createObjectURL(selectedFile)); 
    };

    // Function untuk mengunggah file
    const handleUpload = async () => {
        if (!file) {
            alert('Pilih file untuk diupload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log('Mengunggah file:', file); // Log informasi file
            const response = await axiosInstance.post('/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response mengunggah:', response.data); // Log data respons
            setImageUrl(response.data.url); // Perbarui imageUrl dengan URL gambar yang diunggah
            setUploadMessage('Upload berhasil.');
        } catch (error) {
            console.error('Error mengunggah file:', error.response || error.message);
            setUploadMessage('Upload gagal. Silakan coba lagi.');
        }
    };

    // Function untuk mengunduh file
    const handleDownload = async () => {
        try {
            const filename = imageUrl.split('/').pop(); // Ekstrak nama file dari imageUrl
            const response = await axiosInstance.get(`/profile/download/${filename}`, {
                responseType: 'blob', // Penting untuk mengunduh file
            });

            // Buat URL untuk blob dan trigger unduhan
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error mengunduh file:', error.response || error.message);
        }
    };

    return (
        <Box>
            {uploadMessage && (
                <Alert severity={uploadMessage.includes('berhasil') ? 'success' : 'error'}>
                    {uploadMessage}
                </Alert>
            )}
            <Avatar
                src={imageUrl}
                alt="Profil"
                sx={{ width: 120, height: 120 }}
            />
            <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained" color="primary" component="label">
                    Pilih File
                    <input hidden type="file" onChange={handleFileChange} />
                </Button>
                <Button variant="outlined" color="error" onClick={() => setImageUrl('default_image_url')}>
                    Reset
                </Button>
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Unggah Gambar Profil
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDownload}>
                    Unduh Gambar Profil
                </Button>
            </Stack>
        </Box>
    );
};

export default AccountTab;
