import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  role: '',
  accessToken: '',
  userId: null, 


};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {

      const { name, role, accessToken, userId } = action.payload; 
      state.name = name;
      state.role = role;
      state.accessToken = accessToken;
      state.userId = userId; 

    },
    clearUser(state) {
      state.name = '';
      state.role = '';
      state.accessToken = '';
      state.userId = null; 

    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
