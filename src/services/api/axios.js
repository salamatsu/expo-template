import axios from "axios";

import { useUserAuthStore } from "../../store/useUserAuthStore";
import { BASE_URL } from "../../constants";

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const createAxiosInstanceWithInterceptor = (type = "data") => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (type === "data") {
    headers["Content-Type"] = "application/json";
  } else {
    headers["content-type"] = "multipart/form-data";
  }

  const instance = axios.create({
    baseURL: BASE_URL,
    headers,
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const { token } = useUserAuthStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authorization token not found.");
      }
    } catch (error) {
      console.error({ error });
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const { reset } = useUserAuthStore.getState();
      const errMessage = error.response?.data;
      if (errMessage?.message === "Invalid token." || errMessage?.code == 300) {
        Toast.show({
          swipeable: true,
          type: "error",
          text1: "",
          text2:
            error?.response?.data?.message ||
            "Unable to process transaction. You have to login again.",
        });

        reset();
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
