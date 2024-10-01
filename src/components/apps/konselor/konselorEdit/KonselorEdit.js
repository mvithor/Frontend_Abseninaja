import React, { useEffect, useState } from "react";
import { Grid, Box, Button, MenuItem } from "@mui/material";
import { IconUser, IconMail, IconPhone } from '@tabler/icons';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";

const KonselorEditForm = ({ konselor, handleChange, handleSubmit, handleCancel }) => {
    const [konselorData, setKonselorData] = useState(konselor);

    useEffect(() => {
        setKonselorData(konselor);
    }, [konselor]);

    const onChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === 'status_aktif' ? (value === 'true') : value;
        console.log(`Updated ${name}:`, updatedValue); // Tambahkan log ini
        setKonselorData((prevState) => ({
            ...prevState,
            [name]: updatedValue
        }));
        handleChange(event);
    };
    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, konselorData)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nama" sx={{ mt: 0, mb: 1 }}>
                            Nama
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="nama"
                        name="nama"
                        value={konselorData.nama || ''}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        startAdornment={<IconUser size="20" />}
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
                        value={konselorData.email || ''}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        startAdornment={<IconMail size="20" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="bidang" sx={{ mt: 0, mb: 1 }}>
                            Bidang
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="bidang"
                        name="bidang"
                        value={konselorData.bidang || ''}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        startAdornment={<IconMail size="20" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <CustomFormLabel htmlFor="nomor_telepon" sx={{ mt: 0, mb: 1 }}>
                            Telepon
                        </CustomFormLabel>
                    </Box>
                    <CustomOutlinedInput
                        id="nomor_telepon"
                        name="nomor_telepon"
                        value={konselorData.nomor_telepon || ''}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        startAdornment={<IconPhone size="20" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomFormLabel htmlFor="status_aktif" sx={{ mt: 0, mb: 1 }}>
                        Status
                    </CustomFormLabel>
                    <CustomSelect
                        labelId="status_aktif"
                        id="status_aktif"
                        name="status_aktif"
                        value={konselorData.status_aktif}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value={true}>Aktif</MenuItem>
                        <MenuItem value={false}>Tidak Aktif</MenuItem>
                    </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }}>
                        <Button
                            sx={{
                                mr: 2,
                                backgroundColor: "#F48C06",
                                '&:hover': { backgroundColor: "#f7a944" }
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Edit
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: "#2F327D",
                                '&:hover': { backgroundColor: "#63659e" }
                            }}
                            variant="contained"
                            color="secondary"
                            type="button"
                            onClick={handleCancel}
                        >
                            Batal
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default KonselorEditForm;
