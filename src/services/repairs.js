import api from '../utils/api';

export const createRepair = async (values) => {
  const response = await api.post('/repair/', values);
  return response.data;
};

export const retrieveRepair = async (equipmentAsset) => {
  const response = await api.get(`/repair/${equipmentAsset}/`);

  return response.data;
};

export const detailRepair = async () => {
  const response = await api.get(`/repair/`);

  return response.data;
};

export const updateRepair = async (equipmentAsset, values) => {
  const response = await api.patch(`/repair/${equipmentAsset}/`, values);

  return response.data;
};
export const deleteRepair = async (equipmentAsset) => {
  const response = await api.delete(`/repair/${equipmentAsset}/`);

  return response.data;
};
