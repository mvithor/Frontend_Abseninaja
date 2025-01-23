import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import { IconUser, IconMail, IconLock } from "@tabler/icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import axiosInstance from "src/utils/axiosInstance";

const TambahAdminForm = ({ setSuccess, setError }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationKey: ["tambahAdmin"],
        mutationFn: async (newAdmin) => {
            const response = await axiosInstance.post('/api/v1/users/admin', newAdmin);
            return response.data;
        },
        onSuccess: (data) => {
            setSuccess(data.msg);
            setError("");
            setTimeout(() => navigate("/dashboard/admin-sekolah/user-admin"), 3000);
        },
        onError: (error) => {
            const errorDetails = error.response?.data?.errors || []; 
            const errorMsg = error.response?.data?.msg || 'Terjadi kesalahan saat menambahkan data siswa';
            if (errorDetails.length > 0) {
                setError(errorDetails.join(', '));
            } else {
                setError(errorMsg);
            }
            setSuccess('');
            setTimeout(() => setError(''), 3000); 
        },
        onSettled: () => {
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate(formState);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: -3}}>
            <Grid item xs={12}>
                <CustomFormLabel htmlFor="name" sx={{ mt: 1.85 }}>Nama Admin</CustomFormLabel>
                     <CustomOutlinedInput
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
                        fullWidth
                        required
                    />
            </Grid>
            <Grid item xs={12}>
                <CustomFormLabel htmlFor="email" sx={{ mt: 1.85 }}>Email</CustomFormLabel>
                    <CustomOutlinedInput
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><IconMail /></InputAdornment>}
                        fullWidth
                        required
                    />
            </Grid>
            <Grid item xs={12}>
                <CustomFormLabel htmlFor="password" sx={{ mt: 1.85 }}>Password</CustomFormLabel>
                    <CustomOutlinedInput
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        startAdornment={<InputAdornment position="start"><IconLock /></InputAdornment>}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
            </Grid>
            <Box sx={{ mt: 4 }}>
                <SubmitButton isLoading={mutation.isLoading}>Simpan</SubmitButton>
                <CancelButton onClick={handleCancel}>Batal</CancelButton>
            </Box>
        </Box>
    );
};

export default TambahAdminForm;