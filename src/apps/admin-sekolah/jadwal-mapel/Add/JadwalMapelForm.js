import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, MenuItem, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import SubmitButton from "src/components/buttonGroup/SubmitButton";
import CancelButton from "src/components/buttonGroup/CancelButton";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import axiosInstance from "src/utils/axiosInstance";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const JadwalMapelForm = ({ setSuccess, setError }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedClass, setSelectedClass] = useState("");
  const [formState, setFormState] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  const { data: kelasOptions = [] } = useQuery({
    queryKey: ["kelasOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/dropdown/kelas");
      return response.data.data;
    },
  });

  const { data: waktuOptions = [] } = useQuery({
    queryKey: ["waktuOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/dropdown/waktu");
      return response.data.data;
    },
  });

  const { data: mapelOptions = [] } = useQuery({
    queryKey: ["mapelOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/dropdown/mapel");
      return response.data.data;
    },
  });

  const { data: guruOptions = [] } = useQuery({
    queryKey: ["guruOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/dropdown/guru-mapel");
      return response.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newJadwal) => {
      const response = await axiosInstance.post("/api/v1/jadwal-mapel", newJadwal);
      return response.data;
    },
    onSuccess: (data) => {
      setSuccess(data.msg);
      setError("");
      queryClient.invalidateQueries(["jadwalMapel"]);
      setTimeout(() => navigate("/dashboard/admin-sekolah/jadwal-mapel"), 3000);
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan";
      setError(errorMsg);
      setSuccess("");
      setTimeout(() => setError(""), 3000);
    },
  });

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleJadwalChange = (day, index, field, value) => {
    const updatedJadwal = [...formState[day]];
    updatedJadwal[index] = { ...updatedJadwal[index], [field]: value };
    setFormState((prevState) => ({ ...prevState, [day]: updatedJadwal }));
  };

  const addSlot = (day) => {
    setFormState((prevState) => ({
      ...prevState,
      [day]: [...prevState[day], { waktu_id: "", mata_pelajaran_id: "", guru_id: "" }],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = daysOfWeek.flatMap((day) =>
      formState[day].map((slot) => ({
        kelas_id: selectedClass,
        hari_id: day,
        ...slot,
      }))
    );
    mutation.mutate({ jadwal: payload });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="kelas_id">Pilih Kelas</CustomFormLabel>
          <CustomSelect
            id="kelas_id"
            name="kelas_id"
            value={selectedClass}
            onChange={handleChangeClass}
            fullWidth
            required
            displayEmpty
            inputProps={{ "aria-label": "Pilih Kelas" }}
          >
            <MenuItem value="" disabled>
              Pilih Kelas
            </MenuItem>
            {kelasOptions.map((kelas) => (
              <MenuItem key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        {daysOfWeek.map((day) => (
          <Grid key={day} item xs={12}>
            <Typography variant="h6">{day}</Typography>
            {formState[day].map((slot, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <CustomFormLabel>Waktu</CustomFormLabel>
                  <CustomSelect
                    value={slot.waktu_id}
                    onChange={(e) => handleJadwalChange(day, index, "waktu_id", e.target.value)}
                    fullWidth
                    required
                  >
                    <MenuItem value="" disabled>
                      Pilih Waktu
                    </MenuItem>
                    {waktuOptions.map((waktu) => (
                      <MenuItem key={waktu.id} value={waktu.id}>
                        {`${waktu.jam_mulai} - ${waktu.jam_selesai} (${waktu.kategori_waktu})`}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>

                <Grid item xs={4}>
                  <CustomFormLabel>Mata Pelajaran</CustomFormLabel>
                  <CustomSelect
                    value={slot.mata_pelajaran_id}
                    onChange={(e) => handleJadwalChange(day, index, "mata_pelajaran_id", e.target.value)}
                    fullWidth
                    required
                  >
                    <MenuItem value="" disabled>
                      Pilih Mapel
                    </MenuItem>
                    {mapelOptions.map((mapel) => (
                      <MenuItem key={mapel.id} value={mapel.id}>
                        {mapel.nama_mapel}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>

                <Grid item xs={4}>
                  <CustomFormLabel>Guru</CustomFormLabel>
                  <CustomSelect
                    value={slot.guru_id}
                    onChange={(e) => handleJadwalChange(day, index, "guru_id", e.target.value)}
                    fullWidth
                    required
                  >
                    <MenuItem value="" disabled>
                      Pilih Guru
                    </MenuItem>
                    {guruOptions
                      .filter((guru) => guru.mata_pelajaran_id === slot.mata_pelajaran_id)
                      .map((guru) => (
                        <MenuItem key={guru.id} value={guru.id}>
                          {guru.nama_guru}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                </Grid>
              </Grid>
            ))}
            <button type="button" onClick={() => addSlot(day)}>
              Tambah Slot Waktu
            </button>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <SubmitButton isLoading={mutation.isLoading}>Simpan</SubmitButton>
        <CancelButton onClick={handleCancel}>Batal</CancelButton>
      </Box>
    </Box>
  );
};

export default JadwalMapelForm;
