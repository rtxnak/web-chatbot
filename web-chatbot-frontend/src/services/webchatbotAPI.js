import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_LINK || "http://localhost:3002/"

export const api = axios.create({
  baseURL: url,
});

export const login = async (username,
  password) => {
  try {
    const body = {
      username,
      password,
    }
    const { data } = await api.post('/auth/login', body);
    return data;
  } catch (error) {
    const axiosError = error
    return axiosError.response?.data;
  }
}

export const register = async (username, email,
  password) => {
  try {
    const body = {
      username,
      email,
      password,
    }
    const { data } = await api.post('/auth/register', body);
    return data;
  } catch (error) {
    const axiosError = error
    return axiosError.response?.data;
  }
}