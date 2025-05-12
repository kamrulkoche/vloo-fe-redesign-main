import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useCityList = (type) => {
  const endpoint =
    type === "user" ? "/customer/city/list" : "/space-owner/city/list";
  return apiClient.getQuery(endpoint);
};

export default useCityList;
