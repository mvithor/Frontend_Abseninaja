import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "src/utils/axiosInstance";
import { createSelector } from "reselect";


const API_URL = '/konsultasi-wali-siswa';
const OPTIONS_URL = '/konsultasi-wali-siswa/options';

const initialState = {
    konsultasiWaliSiswa: [],
    currentFilter: 'all',
    konsultasiSearch: '',
    editingItem: null,
    selectedKonsultasi: null,
    loading: false,
    error: '',
    statusOptions: []
};

export const KonsultasiSlice = createSlice ({
    name: 'konsultasi',
    initialState,
    reducers: {
        getKonsultasiWaliSiswa: (state, action) => {
            state.konsultasiWaliSiswa = Array.isArray(action.payload) ? action.payload : [];
        },
        setVisibilityFilter: (state, action) => {
            state.currentFilter = action.payload;
        },
        searchKonsultasi: (state, action) => {
            state.konsultasiSearch = action.payload;
        },
        deleteKonsultasiWaliSiswa: (state, action) => {
            state.konsultasiWaliSiswa = state.konsultasiWaliSiswa.filter(
              (konsultasi) => konsultasi.id !== action.payload
            );
        },
        setEditingItem: (state, action) => {
            state.editingItem = action.payload;
        },
        fetchKonsultasiWaliSiswaByIdRequest: (state) => {
            state.loading = true;
            state.errror = '';
        },
        fetchKonsultasiWaliSiswaByIdSuccess: (state, action) => {
            state.selectedKonsultasi = action.payload;
            state.loading = false;
            state.errror = '';
        },
        fetchKonsultasiWaliSiswaByIdFailure: (state, action) => {
            state.loading = false;
            state.errror = action.payload;
        },
        setStatusOptions: (state, action) => {
            state.statusOptions = Array.isArray(action.payload) ? action.payload : [];
        },
        setSelectedKonsultasi: (state, action) => {
            state.selectedKonsultasi = action.payload
        },
    },
});

export const {
    getKonsultasiWaliSiswa,
    setVisibilityFilter,
    searchKonsultasi,
    deleteKonsultasiWaliSiswa,
    setEditingItem,
    fetchKonsultasiWaliSiswaByIdRequest,
    fetchKonsultasiWaliSiswaByIdSuccess,
    fetchKonsultasiWaliSiswaByIdFailure,
    setStatusOptions,
    setSelectedKonsultasi
} = KonsultasiSlice.actions

export const fetchKonsultasiWaliSiswa = (waliSiswaId = null) => async (dispatch) => {
    try {
        const response = waliSiswaId
        ? await axiosInstance.get(`${API_URL}/${waliSiswaId}`)
        : await axiosInstance.get(API_URL);
        dispatch(getKonsultasiWaliSiswa(response.data))
    } catch (error) {
        console.error("Gagal mengambil data konsultasi", error);
        dispatch(fetchKonsultasiWaliSiswaByIdFailure(error.message));
    };
};

export const fetchKonsultasiWaliSiswaById = (id) => async (dispatch) => {
    dispatch(fetchKonsultasiWaliSiswaByIdRequest());
    try {
        const response = await axiosInstance.get(`${API_URL}/${id}`);
        dispatch(fetchKonsultasiWaliSiswaByIdSuccess(response.data));
    } catch (error) {
        dispatch(fetchKonsultasiWaliSiswaByIdFailure(error.message));
    };
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

// Tambahkan thunk untuk memilih konsultasi
export const selectedKonsultasi = (konsultasi) => (dispatch) => {
    dispatch(setSelectedKonsultasi(konsultasi));
};

// Selector filter data
const selectKonsultasiWaliSiswa = (state) => state.konsultasi.konsultasiWaliSiswa;
const selectCurrentFilter = (state) => state.konsultasi.currentFilter;
const selectKonsultasiSearch = (state) => state.konsultasi.konsultasiSearch;

export const getVisibleKonsultasi = createSelector(
    [selectKonsultasiWaliSiswa, selectCurrentFilter, selectKonsultasiSearch],
    (konsultasiWaliSiswa, filter, konsultasiSearch) => {
        return Array.isArray(konsultasiWaliSiswa) ? konsultasiWaliSiswa.filter(
            (k) =>
                (filter === 'all' || k.status_konseling === filter) &&
            k.topik.toLowerCase().includes(konsultasiSearch.toLowerCase())
        ) : [];
    }
);

export default KonsultasiSlice.reducer;