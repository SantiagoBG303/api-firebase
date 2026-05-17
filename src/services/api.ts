import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.disneyapi.dev',
  timeout: 10000,
});

export const fetchCharacters = async (page = 1, query = '') => {
  const params: any = { page };
  if (query) params.name = query;
  const res = await api.get('/characters', { params });
  return res.data;
};

export default api;
