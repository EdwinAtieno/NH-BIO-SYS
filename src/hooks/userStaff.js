import { useContext } from 'react';
import StaffContext from '../context/user/StaffContext';

const useStaff = () => {
  return useContext(StaffContext);
};

export default useStaff;
