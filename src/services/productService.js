import axios from 'axios';

const API_URL = 'https://product-app-ag37.onrender.com/api/v1/products';

export const getAllProducts = () => {
  return axios.get(API_URL);
};

export const getProduct = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createProduct = (product) => {
  return axios.post(API_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.patch(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
