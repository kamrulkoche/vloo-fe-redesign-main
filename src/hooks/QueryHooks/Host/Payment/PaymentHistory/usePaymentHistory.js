import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const usePaymentHistory = () => {
  const endpoint = "/customer/work-space-booking/list";
  return apiClient.getQuery(endpoint);
};

export default usePaymentHistory;
