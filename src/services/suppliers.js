export const getSupplier = async (api, supplierId) => {
  const response = await api.get(`/suppliers/${supplierId}/`);
  return response.data;
};

export const createSupplier = async (api, values) => {
  const response = await api.get(`/suppliers/`, values);
  return response.data;
};

export const updateSupplier = async (api, supplierId, values) => {
  const response = await api.patch(`/suppliers/${supplierId}/`, values);
  return response.data;
};

export const getSeppliers = async (api) => {
  const response = await api.get(`/suppliers/`);
  return response.data.results;
};

export const deleteSupplier = async (api, supplierId) => {
  const response = await api.delete(`/suppliers/${supplierId}/`);
  return response.data;
};
