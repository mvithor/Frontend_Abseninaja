import React, { useState } from 'react';
import { CardContent, Grid, Typography, MenuItem, Box, Avatar, Button, Stack } from '@mui/material';
import axios from 'axios';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';

// locations
const locations = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'india', label: 'India' },
  { value: 'russia', label: 'Russia' },
];

// currency
const currencies = [
  { value: 'us', label: 'US Dollar ($)' },
  { value: 'uk', label: 'United Kingdom (Pound)' },
  { value: 'india', label: 'India (INR)' },
  { value: 'russia', label: 'Russia (Ruble)' },
];

const AccountTab = () => {
  const [location, setLocation] = useState('india');
  const [currency, setCurrency] = useState('india');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(user1);

  const handleChange1 = (event) => setLocation(event.target.value);
  const handleChange2 = (event) => setCurrency(event.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert('Pilih file untuk diupload');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const studentId = 'student_id_here'; // replace with actual student ID
      const response = await axios.post(`/profile/upload/${studentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImageUrl(response.data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>Change Profile</Typography>
            <Typography color="textSecondary" mb={3}>Change your profile picture from here</Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={imageUrl}
                  alt="Profile"
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                  </Button>
                  <Button variant="outlined" color="error">Reset</Button>
                </Stack>
                <Button variant="contained" color="primary" onClick={handleUpload}>Upload Profile Image</Button>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>Change Password</Typography>
            <Typography color="textSecondary" mb={3}>To change your password please confirm here</Typography>
            <form>
              <CustomFormLabel htmlFor="text-cpwd">Current Password</CustomFormLabel>
              <CustomTextField id="text-cpwd" variant="outlined" fullWidth type="password" />
              <CustomFormLabel htmlFor="text-npwd">New Password</CustomFormLabel>
              <CustomTextField id="text-npwd" variant="outlined" fullWidth type="password" />
              <CustomFormLabel htmlFor="text-conpwd">Confirm Password</CustomFormLabel>
              <CustomTextField id="text-conpwd" variant="outlined" fullWidth type="password" />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>Personal Details</Typography>
            <Typography color="textSecondary" mb={3}>To change your personal detail, edit and save from here</Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-name">Your Name</CustomFormLabel>
                  <CustomTextField id="text-name" variant="outlined" fullWidth value="Mathew Anderson" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-store-name">Store Name</CustomFormLabel>
                  <CustomTextField id="text-store-name" variant="outlined" fullWidth value="Maxima Studio" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-location">Location</CustomFormLabel>
                  <CustomSelect fullWidth id="text-location" variant="outlined" value={location} onChange={handleChange1}>
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-currency">Currency</CustomFormLabel>
                  <CustomSelect fullWidth id="text-currency" variant="outlined" value={currency} onChange={handleChange2}>
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-email">Email</CustomFormLabel>
                  <CustomTextField id="text-email" variant="outlined" fullWidth value="info@modernize.com" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-phone">Phone</CustomFormLabel>
                  <CustomTextField id="text-phone" variant="outlined" fullWidth value="+91 12345 65478" />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="text-address">Address</CustomFormLabel>
                  <CustomTextField id="text-address" variant="outlined" fullWidth value="814 Howard Street, 120065, India" />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">Save</Button>
          <Button size="large" variant="text" color="error">Cancel</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
