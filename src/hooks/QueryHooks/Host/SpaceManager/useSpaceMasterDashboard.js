import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useSpaceMasterDashboard = () => {
  const endpoint = "/space-owner/space-owner/spaceOwnerDashboard";
  return apiClient.getQuery(endpoint);
};

export default useSpaceMasterDashboard;
