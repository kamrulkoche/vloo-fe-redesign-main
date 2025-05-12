import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useDashboardList = () => {
  const endpoint = "/space-owner/dashboard/list";
  return apiClient.getQuery(endpoint);
};

export default useDashboardList;
