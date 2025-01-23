import React, { useCallback, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import QRScanner from "react-qr-scanner";

const QRCodeScanner = ({ onScanSuccess, onScanError, disabled = false }) => {
  const isProcessing = useRef(false);
  const successAudioRef = useRef(new Audio("/sound/beep.mp3")); // Suara sukses
  const errorAudioRef = useRef(new Audio("/sound/error.mp3")); // Suara error

  const handleScan = useCallback(
    async (data) => {
      if (data && !isProcessing.current) {
        isProcessing.current = true; // Hindari pemrosesan ulang
        const text = data.text || data;

        console.log("QR Code Ditemukan:", text);

        try {
          const isSuccess = await onScanSuccess(text); // Jalankan callback sukses

          // Putar suara berdasarkan hasil
          const audio = isSuccess ? successAudioRef.current : errorAudioRef.current;
          if (audio) {
            audio.play().catch((err) => console.error("Error playing sound:", err));
          }
        } catch (err) {
          console.error("Error during scan success callback:", err);

          // Putar suara error jika callback gagal
          if (errorAudioRef.current) {
            errorAudioRef.current.play().catch((error) => {
              console.error("Error playing error sound:", error);
            });
          }
        } finally {
          setTimeout(() => {
            isProcessing.current = false; // Reset untuk scan berikutnya
          }, 1000); // Reset dalam 1 detik
        }
      }
    },
    [onScanSuccess]
  );

  const handleError = useCallback(
    (err) => {
      console.error("Error Scanner:", err.message);

      // Putar suara error
      if (errorAudioRef.current) {
        errorAudioRef.current.play().catch((error) => {
          console.error("Error playing error sound:", error);
        });
      }

      if (onScanError) {
        onScanError(err.message);
      }
    },
    [onScanError]
  );

  const handleReset = () => {
    console.log("Reset Scanner");
    isProcessing.current = false;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {disabled ? "Memproses..." : "Arahkan kamera ke QR Code"}
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: "300px",
          overflow: "hidden",
          border: "2px solid #1976d2",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
          position: "relative",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <QRScanner
          delay={100} // Scan setiap 100ms
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Memastikan video menutupi area dengan proporsi benar
          }}
          onError={handleError}
          onScan={handleScan}
          constraints={{
            video: { width: 1280, height: 720, facingMode: "environment" }, // Resolusi tinggi
          }}
          disabled={disabled}
        />
      </Box>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={handleReset}
        disabled={disabled}
      >
        Reset Kamera
      </Button>
    </Box>
  );
};

export default QRCodeScanner;