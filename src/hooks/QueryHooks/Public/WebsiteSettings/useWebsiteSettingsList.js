import APIClient from "@/services/api-client";
const apiClient = new APIClient();

const useWebsiteSettingsList = () => {
  const endpoint = "/public/website-setting/list";

  return apiClient.getQuery(endpoint);
};

export default useWebsiteSettingsList;
