export const getEquipment = async (api, equipmentId) => {
  const response = await api.get(`/equipments/${equipmentId}/`);
  return response.data;
};

export const createEquipment = async (api, values) => {
  const response = await api.get(`/equipments/`, values);
  return response.data;
};

export const updateEquipmentStatus = async (api, assetNumber, values) => {
  const response = await api.patch(
    `/equipments/${assetNumber}/status/`,
    values
  );
  return response.data;
};

export const getEquipments = async (api) => {
  const response = await api.get(`/equipments/`);
  return response.data.results;
};
