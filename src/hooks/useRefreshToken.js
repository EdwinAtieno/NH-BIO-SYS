import api from '../utils/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { authToken, setAuthToken, logOut } = useAuth();

  const refresh = async () => {
    try {
      const response = await api.post('/token/refresh/', {
        refresh: authToken?.refresh,
      });
      setAuthToken(response.data);
      return response.data;
    } catch (err) {
      logOut();
    }
    return {};
  };
  return refresh;
};

export default useRefreshToken;
