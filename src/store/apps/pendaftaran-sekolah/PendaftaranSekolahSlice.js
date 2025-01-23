import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "src/utils/axiosInstance";
import { createSelector } from "reselect";

const API_URL = '/api/v1/pendaftaran/data';

const initialState= {
    pendaftaranSekolah: [],
    currentFilter: 'all',
    pendaftaranSearch:'',
    editingItem: null,
    selectedPendaftaran: null,
    loading: false,
    error: '',  
     
};

export const PendaftaranSekolahSlice = createSlice({
    name: 'pendaftaranSekolah',
    initialState,
    reducers: {
        getPendaftaranSekolah: (state, action) => {
            state.pendaftaranSekolah = Array.isArray(action.payload) ? action.payload : [];
        },
        setVisibilityFilter: (state, action) => {
            state.currentFilter = action.payload;
        },
        searchPendaftaranSekolah: (state, action) => {
            state.pendaftaranSearch = action.payload;
        },
        deletePendaftaranSekolah: (state, action) => {
            state.pendaftaranSekolah = state.pendaftaranSekolah.filter(
                (pendaftaran) => pendaftaran.id !== action.payload
            );
        },
        setEditingItem: (state, action) => {
            state.editingItem = action.payload;
        },
        fetchPendaftaranSekolahByIdRequest: (state) => {
            state.loading = true;
            state.error = '';
        },
        fetchPendaftaranSekolahByIdSuccess: (state, action) => {
            state.selectedPendaftaran = action.payload;
            state.loading = false;
            state.error = '';
        },
        fetchPendaftaranSekolahByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedPendaftaran: (state, action) => {
            state.selectedPendaftaran = action.payload;
        },
    },
});

export const {
    getPendaftaranSekolah,
    setVisibilityFilter,
    searchPendaftaranSekolah,
    deletePendaftaranSekolah,
    setEditingItem,
    fetchPendaftaranSekolahByIdRequest,
    fetchPendaftaranSekolahByIdSuccess,
    fetchPendaftaranSekolahByIdFailure,
    setSelectedPendaftaran
} = PendaftaranSekolahSlice.actions;

export const fetchPendaftaranSekolah = (sekolahId = null) => async (dispatch) => {
    try {
        const response = sekolahId
        ? await axiosInstance.get(`${API_URL}/${sekolahId}`)
        : await axiosInstance.get(API_URL);
        dispatch(getPendaftaranSekolah(response.data));
    } catch (error) {
        console.error("Gagal mengambil data pendaftaran sekolah:", error)
    };
};

export const fetchPendaftaranSekolahById = (id) => async (dispatch) => {
    dispatch(fetchPendaftaranSekolahByIdRequest());
    try {
        const response = await axiosInstance.get(`${API_URL}/${id}`);
        dispatch(fetchPendaftaranSekolahByIdSuccess(response.data));
    } catch (error) {
        dispatch(fetchPendaftaranSekolahByIdFailure(error.message));
    }
};

export const selectPendaftaran = (pendaftaran) => (dispatch) => {
    dispatch(setSelectedPendaftaran(pendaftaran))
};

// Selector filter data
const selectPendaftaranSekolah = (state) => state.pendaftaran.pendaftaranSekolah;
const selectCurrentFilter = (state) => state.pendaftaran.currentFilter;
const selectPendaftaranSearch = (state) => state.pendaftaran.pendaftaranSearch;

export const getVisiblePendaftaran = createSelector(
    [selectPendaftaranSekolah, selectCurrentFilter, selectPendaftaranSearch],
    (pendaftaranSekolah, filter, pendaftaranSearch) => {
        return Array.isArray(pendaftaranSekolah) 
            ? pendaftaranSekolah.filter((p) => {
                const statusMatches = filter === 'all' || p.StatusPendaftaran?.status_pendaftaran === filter;
                const searchMatches = p.nama.toLowerCase().includes(pendaftaranSearch.toLowerCase());
                return statusMatches && searchMatches;
            })
            : [];
    }
);


export default PendaftaranSekolahSlice.reducer;