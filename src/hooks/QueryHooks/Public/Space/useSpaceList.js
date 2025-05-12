import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useSpaceList = (type) => {
  const endpoint =
    type === "user"
      ? "/customer/space/dashboard_space_list"
      : "/public/space/list";
  return apiClient.getQuery(endpoint);
};

export default useSpaceList;
