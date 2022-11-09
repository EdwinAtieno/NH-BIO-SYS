import api from '../utils/api';

export const userRegistration = async (values) => {
  const response = await api.post('/user/', values);
  return response.data;
};

export default userRegistration;
