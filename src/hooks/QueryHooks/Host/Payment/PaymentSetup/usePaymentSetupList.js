import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const usePaymentSetupList = () => {
  const endpoint = "/space-owner/space-owner-account/list";
  return apiClient.getQuery(endpoint);
};

export default usePaymentSetupList;
