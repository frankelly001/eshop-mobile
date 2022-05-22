import apiClient from './client';

const endPoint = '/products/categories';

export const getCategories = () => {
  return apiClient.get(endPoint);
};
