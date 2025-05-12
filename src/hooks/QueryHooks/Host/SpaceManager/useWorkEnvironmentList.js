import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useWorkEnvironmentList = () => {
  const endpoint = "/space-owner/environment/environmentList";
  return apiClient.getQuery(endpoint);
};

export default useWorkEnvironmentList;
