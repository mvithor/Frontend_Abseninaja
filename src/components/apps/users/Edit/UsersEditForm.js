import React, { useState, useEffect } from "react";
import { Grid, Box, MenuItem, InputAdornment, TextField } from '@mui/material';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import SubmitButton from "../../buttonGroup/SubmitButton";
import CancelButton from "../../buttonGroup/CancelButton";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import { IconMail, IconClock, IconUser, IconCrown } from '@tabler/icons';
import axiosInstance from "src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const UsersEditForm = ({ user, setSuccess, setError }) => {
  const [roleOptions, setRoleOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    updatedAt: '',
    roleId: ''
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get('/users/options');
        setRoleOptions(response.data);
      } catch (error) {
        const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat memuat data";
        console.error("Error fetching data:", errorMsg);
        setError(errorMsg);
        setTimeout(() => setError(""), 3000);
      }
    };
    fetchRole();
  }, [setError]);

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name || '',
        email: user.email || '',
        updatedAt: user.updated_at || '',
        roleId: user.role_id || ''
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axiosInstance.put(`/users/${user.id}`, {
        name: formState.name,
        email: formState.email,
        updated_at: formState.updatedAt,
        role_id: formState.roleId
      });
      setSuccess(response.data.msg);
      setTimeout(() => {
        setSuccess("");
        navigate('/dashboard/admin/users');
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan saat mengupdate pengguna";
      console.error("Terjadi kesalahan:", errorMsg);
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: 1 }}>
              Nama
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            id="name"
            name="name"
            value={formState.name || ''}
            onChange={handleChange}
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconUser /></InputAdornment>}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="email" sx={{ mt: 0, mb: 1 }}>
              Email
            </CustomFormLabel>
          </Box>
          <CustomOutlinedInput
            id="email"
            name="email"
            value={formState.email || ''}
            onChange={handleChange}
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconMail /></InputAdornment>}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="updatedAt" sx={{ mt: 0, mb: 1 }}>
              Diperbarui
            </CustomFormLabel>
          </Box>
          <TextField
            id="updatedAt"
            name="updatedAt"
            type="date"
            value={formState.updatedAt ? new Date(formState.updatedAt).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconClock />
                </InputAdornment>
              ),
            }}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <CustomFormLabel htmlFor="roleId" sx={{ mt: 0, mb: 1 }}>
              Akses
            </CustomFormLabel>
          </Box>
          <CustomSelect
            id="roleId"
            name="roleId"
            value={formState.roleId || ''}
            onChange={handleChange}
            variant="outlined"
            startAdornment={<InputAdornment position="start"><IconCrown /></InputAdornment>}
            fullWidth
            required
          >
            {roleOptions.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.role_name}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
            <SubmitButton isLoading={isLoading} />
            <CancelButton onClick={handleCancel}>Batal</CancelButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

UsersEditForm.propTypes = {
  user: PropTypes.object.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default UsersEditForm;
