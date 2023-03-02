import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
