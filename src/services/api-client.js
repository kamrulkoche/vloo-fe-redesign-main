import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://vloo.lamptechs.com/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  // const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const token = localStorage.getItem("access_token") || null;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

class APIClient {
  getAll = (endpoint, options) =>
    axiosInstance.get(endpoint, options).then((res) => res.data);

  post = (endpoint, options) =>
    axiosInstance.post(endpoint, options).then((res) => res.data);

  delete = (endpoint, data, options) =>
    axiosInstance
      .delete(endpoint, { ...options, data })
      .then((res) => res.data);

  postWithFile = (endpoint, data) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append other data to the FormData object
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Make the POST request with headers
    return axiosInstance.post(endpoint, formData).then((res) => res.data);
  };

  getQuery = (key) =>
    useQuery({
      queryKey: [key],
      queryFn: () => this.getAll(key),
      staleTime: 24 * 60 * 60 * 1000,
    });
}

export default APIClient;
export { axiosInstance };
