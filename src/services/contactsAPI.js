import axios from 'axios';
import { token } from './authApi';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const getContacts = async () => {
  const { data } = await axios.get('/contacts');
  console.log(data.token, 'getContacts');
  console.log(data);
  token.set(data.token);
  return data;
};

export const createContact = async values => {
  const { data } = await axios.post('/contacts', values);
  token.set(data.token);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  token.set(data.token);
  return data;
};
