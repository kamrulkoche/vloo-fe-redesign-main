import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useCityList = (type) => {
  const endpoint =
    type === "user"
      ? "/customer/space/uniqueCityName"
      : "/public/space/uniqueCityName";
  return apiClient.getQuery(endpoint);
};

export default useCityList;
