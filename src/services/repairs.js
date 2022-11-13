export const createRepair = async (api, values) => {
  const response = await api.post('/repair/', values);
  return response.data;
};

export const retrieveRepair = async (api, equipmentAsset) => {
  const response = await api.get(`/repair/${equipmentAsset}/`);

  return response.data;
};

export const detailRepair = async (api) => {
  const response = await api.get(`/repair/`);

  return response.data.results;
};

export const updateRepair = async (api, equipmentAsset, values) => {
  const response = await api.patch(`/repair/${equipmentAsset}/`, values);

  return response.data;
};
export const deleteRepair = async (api, equipmentAsset) => {
  const response = await api.delete(`/repair/${equipmentAsset}/`);

  return response.data;
};
