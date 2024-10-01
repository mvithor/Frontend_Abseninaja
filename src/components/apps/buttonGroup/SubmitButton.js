import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ isLoading }) => {
    return (
        <Button
            sx={{
                mr: 2,
                backgroundColor: "#F48C06",
                color: "white", // Mengatur warna teks tombol menjadi putih
                '&:hover': { backgroundColor: "#FF5F00" }
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
