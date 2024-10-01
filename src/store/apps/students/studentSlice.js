import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {
    id: '',
    user_id:'',
    name: '',
    jenis_kelamin_id: '',
    tanggal_lahir: '',
    kelas_id: '',
    alamat: ''
  }
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentData(state, action) {
      console.log('setStudentData action payload:', action.payload); // Log payload
      state.student = action.payload;
    },
    updateStudentField(state, action) {
      const { field, value } = action.payload;
      console.log('updateStudentField action payload:', field, value); // Log field and value
      // Check if field exists in student state
      if (state.student.hasOwnProperty(field)) {
        state.student[field] = value;
      } else {
        console.error(`Field ${field} does not exist in student state`);
      }
    }
  }
});

export const { setStudentData, updateStudentField } = studentSlice.actions;

export default studentSlice.reducer;
