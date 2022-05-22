import apiClient from './client';

const endPoint = '/products';

export const getProducts = () => {
  return apiClient.get(endPoint);
};
