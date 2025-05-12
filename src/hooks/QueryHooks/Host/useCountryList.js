import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useCountryList = () => {
  const endpoint = "/space-owner/country/list";
  return apiClient.getQuery(endpoint);
};

export default useCountryList;
