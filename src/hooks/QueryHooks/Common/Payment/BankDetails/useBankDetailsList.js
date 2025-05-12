import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useBankDetailsList = (type) => {
  const endpoint =
    type === "user"
      ? "/customer/bank-details/list"
      : "/space-owner/bank-details/list";
  return apiClient.getQuery(endpoint);
};

export default useBankDetailsList;
