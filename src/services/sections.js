export const getSection = async (api, contactPId) => {
  const response = await api.get(`/sections/${contactPId}/`);
  return response.data;
};

export const createSection = async (api, values) => {
  const response = await api.post(`/sections/`, values);
  return response.data;
};

export const updateSection = async (api, contactPId, values) => {
  const response = await api.patch(`/sections/${contactPId}/`, values);
  return response.data;
};

export const getSections = async (api) => {
  const response = await api.get(`/sections/`);
  return response.data.results;
};

export const deleteSection = async (api, contactPId) => {
  const response = await api.delete(`/sections/${contactPId}/`);
  return response.data;
};
