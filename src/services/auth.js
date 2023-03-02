import api from '../utils/api';

export const signInUser = async (values) => {
  const response = await api.post('/sign-in/', values);
  return response.data;
};

export const recoverPassword = async (values) => {
  const response = await api.post('/auth/forgot-password/', values);
  return response.data;
};
