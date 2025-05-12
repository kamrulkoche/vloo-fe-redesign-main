import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useHistoryList = (type) => {
  const endpoint =
    type === "user"
      ? "/customer/payment-history/list"
      : "/space-owner/payment-history/list";
  return apiClient.getQuery(endpoint);
};

export default useHistoryList;
