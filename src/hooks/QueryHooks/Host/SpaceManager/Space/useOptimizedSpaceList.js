import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useOptimizedSpaceList = () => {
  const endpoint = "/space-owner/space/optimize_space_list";
  return apiClient.getQuery(endpoint);
};

export default useOptimizedSpaceList;
