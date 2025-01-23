import React from "react";
import { Container, Typography, Box } from "@mui/material";
import QRCodeScanner from "src/apps/admin-sekolah/absensi/QrCodeScanner";
import axiosInstance from "src/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchPengaturanJam = async () => {
  const response = await axiosInstance.get("/api/v1/pengaturan-jam");
  console.log("Pengaturan Jam (Fetched):", response.data.data);
  return response.data.data;
};

const QrCodeScanView = () => {
  const { data: pengaturanJam, isLoading, isError } = useQuery({
    queryKey: ["pengaturanJam"],
    queryFn: fetchPengaturanJam,
  });

  const handleScanSuccess = async (text) => {
    try {
      console.log("Hasil Scan QR:", text);

      // Parsing hasil QR Code
      const lines = text.split("\n");
      let kode_qr = null;

      lines.forEach((line) => {
        if (line.startsWith("Kode QR:")) {
          kode_qr = line.split(":")[1].trim(); 
        }
      });

      if (!kode_qr) {
        console.error("QR Code tidak valid atau tidak mengandung Kode QR.");
        return false; 
      }

      if (!pengaturanJam) {
        console.error("Pengaturan jam tidak tersedia.");
        return false; // Indikator error
      }

      const currentDate = new Date();
      const currentTime = new Date(
        `${currentDate.toISOString().split("T")[0]}T${currentDate.toTimeString().split(" ")[0]}`
      );

      const jamMasuk = new Date(
        `${currentDate.toISOString().split("T")[0]}T${pengaturanJam.jam_masuk}`
      );
      const jamPulang = new Date(
        `${currentDate.toISOString().split("T")[0]}T${pengaturanJam.jam_pulang}`
      );

      const endpoint =
        currentTime >= jamMasuk && currentTime < jamPulang
          ? "/api/v1/absensi/masuk"
          : "/api/v1/absensi/pulang";

      console.log("Endpoint yang dipanggil:", endpoint);

      const response = await axiosInstance.post(endpoint, {
        kode_qr: kode_qr,
      });

      console.log("Respons Backend:", response.data.msg || "Absen berhasil.");
      return true; 
    } catch (err) {
      console.error("Error Absen:", err.response?.data?.msg || "Gagal melakukan absen.");
      return false; 
    }
  };

  const handleScanError = (errorMessage) => {
    console.error("Error Scanner:", errorMessage);
  };

  if (isLoading) {
    return <Typography>Loading pengaturan jam...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading pengaturan jam.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        QR Code Scanner
      </Typography>

      <QRCodeScanner
        onScanSuccess={handleScanSuccess}
        onScanError={handleScanError}
      />

      <Box sx={{ mt: 3 }}>
        {/* Tambahkan log atau komponen tambahan jika diperlukan */}
      </Box>
    </Container>
  );
};

export default QrCodeScanView;