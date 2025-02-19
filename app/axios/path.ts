import axios from "axios";

const path = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL,
});

path.interceptors.request.use(
  async function (config) {
    // if (config.data) {
    //   const isFormData = Object.values(config.data).some(
    //     (value) => value instanceof File || value instanceof Blob
    //   );

    //   if (isFormData) {
        config.headers["Content-Type"] = "multipart/form-data";
        console.log("xcvbn")
    //   } else {
    //     config.headers["Content-Type"] = "application/json";
    //   }
    // }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default path;
