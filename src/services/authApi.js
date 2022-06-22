import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const token = {
  set: token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset: () => {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = async userData => {
  const { data } = await axios.post('/users/signup', userData);
  return data;
};

export const login = async userData => {
  const { data } = await axios.post('/users/login', userData);
  return data;
};

export const logout = async () => {
  await axios.post('/users/logout');
};

export const refresh = async () => {
  const res = await axios.get('/users/current');
  return res;
};
