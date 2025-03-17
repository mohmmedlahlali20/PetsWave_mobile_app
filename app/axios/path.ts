import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const path = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_URL}:5000/`,
});

path.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  function (err) {
    console.error('Request error:', err);
    return Promise.reject(err);
  }
);

export default path;
