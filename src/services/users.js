export const getUser = async (api, customerId) => {
  const response = await api.get(`/users/${customerId}/`);
  return response.data;
};

export const updateUser = async (api, staffId, values) => {
  const response = await api.patch(`/users/${staffId}/`, values);
  return response.data;
};

export const getAllUser = async (api) => {
  const response = await api.get(`/users/`);
  return response.data.results;
};
