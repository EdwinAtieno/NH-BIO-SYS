import { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { baseURL } from '../utils/api';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxios = () => {
  const { setAuthToken, setUser, authToken } = useAuth();
  const refresh = useRefreshToken();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authToken?.access}` },
  });

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${authToken?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 403 ||
          (error?.response?.status === 401 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;

          const token = await refresh();
          localStorage.setItem(
            'user',
            JSON.stringify({
              isAuthToken: true,
              user: jwtDecode(token?.access),
              token,
            })
          );

          setAuthToken(token);
          setUser(jwtDecode(token?.access));

          prevRequest.headers.Authorization = `Bearer ${token?.access}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [authToken]);

  return axiosInstance;
};

export default useAxios;
