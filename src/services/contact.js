export const getContactPerson = async (api, contactPId) => {
  const response = await api.get(`/contactpersons/${contactPId}/`);
  return response.data;
};

export const createContactPerson = async (api, values) => {
  const response = await api.get(`/contactpersons/`, values);
  return response.data;
};

export const updateContactPerson = async (api, contactPId, values) => {
  const response = await api.patch(`/contactpersons/${contactPId}/`, values);
  return response.data;
};

export const getContactPersons = async (api) => {
  const response = await api.get(`/contactpersons/`);
  return response.data.results;
};

export const deleteContactPerson = async (api, contactPId) => {
  const response = await api.delete(`/contactpersons/${contactPId}/`);
  return response.data;
};
