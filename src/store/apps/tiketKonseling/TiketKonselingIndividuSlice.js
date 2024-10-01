import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axiosInstance';
import { createSelector } from 'reselect';

const API_URL = '/konseling-individu';
const OPTIONS_URL = '/konseling-individu/options';

const initialState = {
  konselingIndividu: [],
  currentFilter: 'all',
  konselingSearch: '',
  editingItem: null,
  selectedKonseling: null, // Tambahkan state untuk konseling yang dipilih
  loading: false,
  error: '',
  statusOptions: [] // Tambahkan state untuk menyimpan opsi status
};

export const KonselingSlice = createSlice({
  name: 'konseling',
  initialState,
  reducers: {
    getKonselingIndividu: (state, action) => {
      state.konselingIndividu = Array.isArray(action.payload) ? action.payload : [];
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    searchKonseling: (state, action) => {
      state.konselingSearch = action.payload;
    },
    deleteKonselingIndividu: (state, action) => {
      state.konselingIndividu = state.konselingIndividu.filter(
        (konseling) => konseling.id !== action.payload
      );
    },
    setEditingItem: (state, action) => {
      state.editingItem = action.payload; // Simpan item yang sedang diedit
    },
    fetchKonselingIndividuByIdRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    fetchKonselingIndividuByIdSuccess: (state, action) => {
      state.selectedKonseling = action.payload;
      state.loading = false;
      state.error = '';
    },
    fetchKonselingIndividuByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setStatusOptions: (state, action) => {
      state.statusOptions = Array.isArray(action.payload) ? action.payload : [];
    },
    setSelectedKonseling: (state, action) => { // Tambahkan reducer untuk setSelectedKonseling
      state.selectedKonseling = action.payload;
    },
  },
});

export const {
  getKonselingIndividu,
  setVisibilityFilter,
  searchKonseling,
  deleteKonselingIndividu,
  setEditingItem,
  fetchKonselingIndividuByIdRequest,
  fetchKonselingIndividuByIdSuccess,
  fetchKonselingIndividuByIdFailure,
  setStatusOptions, // Tambahkan action creator
  setSelectedKonseling, // Tambahkan action creator
} = KonselingSlice.actions;

export const fetchKonselingIndividu = (studentId = null) => async (dispatch) => {
  try {
    const response = studentId
      ? await axiosInstance.get(`${API_URL}/${studentId}`)
      : await axiosInstance.get(API_URL);
    dispatch(getKonselingIndividu(response.data)); // Pastikan response.data adalah array
  } catch (err) {
    console.error('Gagal mengambil konseling individu:', err);
  }
};

export const fetchKonselingIndividuById = (id) => async (dispatch) => {
  dispatch(fetchKonselingIndividuByIdRequest());
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    dispatch(fetchKonselingIndividuByIdSuccess(response.data));
  } catch (error) {
    dispatch(fetchKonselingIndividuByIdFailure(error.message));
  }
};

// Tambahkan thunk untuk mengambil opsi status
export const fetchStatusOptions = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(OPTIONS_URL);
    dispatch(setStatusOptions(response.data));
  } catch (err) {
    console.error('Gagal mengambil opsi status:', err);
  }
};

// Tambahkan thunk untuk memilih konseling
export const selectKonseling = (konseling) => (dispatch) => {
  dispatch(setSelectedKonseling(konseling));
};

// Selector untuk memfilter data
const selectKonselingIndividu = (state) => state.konseling.konselingIndividu;
const selectCurrentFilter = (state) => state.konseling.currentFilter;
const selectKonselingSearch = (state) => state.konseling.konselingSearch;

export const getVisibleKonseling = createSelector(
  [selectKonselingIndividu, selectCurrentFilter, selectKonselingSearch],
  (konselingIndividu, filter, konselingSearch) => {
    return Array.isArray(konselingIndividu) ? konselingIndividu.filter(
      (k) =>
        (filter === 'all' || k.status_konseling === filter) &&
        k.judul_pengaduan.toLowerCase().includes(konselingSearch.toLowerCase())
    ) : [];
  }
);

export default KonselingSlice.reducer;
