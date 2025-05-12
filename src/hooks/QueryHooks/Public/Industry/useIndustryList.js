import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useIndustryList = () => {
  const endpoint = "/public/industry/list";
  return apiClient.getQuery(endpoint);
};

export default useIndustryList;
