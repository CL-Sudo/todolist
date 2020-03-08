import axios from 'axios';

export const apiCaller = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 20000,
  withCredentials: true
});
