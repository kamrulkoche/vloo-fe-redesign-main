import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useSpaceLayoutList = () => {
  const endpoint = "/space-owner/layout/layoutList";
  return apiClient.getQuery(endpoint);
};

export default useSpaceLayoutList;
