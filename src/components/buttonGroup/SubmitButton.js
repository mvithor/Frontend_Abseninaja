import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ isLoading }) => {
    return (
        <Button
            sx={{
                mr: 2,
                backgroundColor: "#973BE0",
                color: "white", // Mengatur warna teks tombol menjadi putih
                '&:hover': { backgroundColor: "#2A85FF" }
            }}
            variant="contained"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? "Loading..." : "Simpan"}
        </Button>
    );
};

export default SubmitButton;
