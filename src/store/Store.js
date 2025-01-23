import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import sidebarReducer from './apps/sidebar/sidebarSlice';
import userReducer from './apps/user/userSlice';
import studentReducer from './apps/students/studentSlice';
import PendaftaranSekolahReducer from './apps/pendaftaran-sekolah/PendaftaranSekolahSlice';


const rootReducer = combineReducers({
  user: userReducer,
  student: studentReducer,
  customizer: CustomizerReducer,
  chat: ChatsReducer,
  notes: NotesReducer,
  userProfile: UserProfileReducer,
  sidebar: sidebarReducer,
  pendaftaran: PendaftaranSekolahReducer,
});

// Konfigurasi persistensi
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['someReducerToExclude'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);