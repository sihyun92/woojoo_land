import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://asia-northeast3-heropy-api.cloudfunctions.net";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_TeamAirPod8",
  },
};

const testConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_TeamAirPod8",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const client = axios.create(axiosConfig);

export const testClient = axios.create(testConfig);

// 헤더 설정
// client.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("token")}`;

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default client;
