export const getDepartment = async (api, DepartmentId) => {
  const response = await api.get(`/departments/${DepartmentId}/`);
  return response.data;
};

export const createDepartment = async (api, values) => {
  const response = await api.get(`/departments/`, values);
  return response.data;
};

export const updateDepartment = async (api, DepartmentId, values) => {
  const response = await api.patch(`/departments/${DepartmentId}/`, values);
  return response.data;
};

export const getDepartments = async (api) => {
  const response = await api.get(`/departments/`);
  return response.data.results;
};

export const deleteDepartment = async (api, DepartmentId) => {
  const response = await api.delete(`/departments/${DepartmentId}/`);
  return response.data;
};
