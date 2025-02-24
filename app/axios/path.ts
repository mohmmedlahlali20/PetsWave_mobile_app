import axios from "axios";

const path = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_URL}:5000/`,
});

path.interceptors.request.use(
  async function (config) {
    if (config.data) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default path;
