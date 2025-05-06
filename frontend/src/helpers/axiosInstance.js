import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
