import { useContext } from 'react';
import axios from 'axios';
import { jwt_decode as jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from '../context/auth/AuthContext';
import { baseURL } from '../utils/api';

const useAxios = () => {
  const { setAuthToken, setUser, authToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authToken?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const admin = jwtDecode(authToken?.access);
    const isExpired = dayjs.unix(admin.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh`, {
      refresh: authToken.refresh,
    });

    localStorage.setItem('authToken', JSON.stringify(response.data));

    setAuthToken(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${authToken?.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
