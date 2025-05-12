import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useFavouriteList = () => {
  const endpoint = "/customer/space/favoriteSpaceList";
  return apiClient.getQuery(endpoint);
};

export default useFavouriteList;
