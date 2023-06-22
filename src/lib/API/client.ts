import axios from "axios";

const client = axios.create();

// 헤더 설정
client.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
