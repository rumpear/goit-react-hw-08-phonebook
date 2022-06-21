import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/users';

export const token = {
  set: token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset: () => {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = async userData => {
  const { data } = await axios.post('/signup', userData);
  token.set(data.token);
  return data;
};

export const login = async userData => {
  const { data } = await axios.post('/login', userData);
  token.set(data.token);
  return data;
};

export const logout = async () => {
  await axios.post('/logout');
  token.unset();
};

export const refresh = async () => {
  const res = await axios.get('/current');
  return res;
};
