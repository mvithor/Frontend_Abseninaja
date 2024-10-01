import React, { createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    id: '',
    user_id:'',
    name: '',
    jenis_kelamin_id: '',
    tanggal_lahir: '',
    kelas_id: '',
    alamat: ''
  });

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
