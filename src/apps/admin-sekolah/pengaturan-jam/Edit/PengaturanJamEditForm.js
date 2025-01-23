import React from "react";
import {
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";

const PengaturanJamEditForm = ({
  jamData,
  handleTimeChange,
  handleSubmit,
  handleCancel,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40px">
        <CircularProgress />
      </Box>
    );
  }

  const getFieldLabel = (field) => {
    return field
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: -4 }}>
      <Grid container spacing={2} rowSpacing={1}>
        {["jam_masuk", "jam_terlambat", "jam_alpa", "jam_pulang"].map((field) => (
          <Grid item xs={12} md={6} key={field}>
            <CustomFormLabel htmlFor={field} sx={{ mt: 1.85 }}>
              {getFieldLabel(field)}
            </CustomFormLabel>
            <TimePicker
              ampm={false}
              disableMaskedInput
              value={
                jamData[field]
                  ? new Date(`1970-01-01T${jamData[field]}`)
                  : null
              }
              onChange={(value) => handleTimeChange(field, value)}
              renderInput={(params) => (
                <CustomTextField {...params} fullWidth size="medium" required />
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <SubmitButton type="submit" />
        <CancelButton onClick={handleCancel} />
      </Box>
    </Box>
  );
};

export default PengaturanJamEditForm;
