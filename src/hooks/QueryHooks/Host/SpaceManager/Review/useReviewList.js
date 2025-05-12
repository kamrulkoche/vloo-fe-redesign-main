import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useReviewList = () => {
  const endpoint = "/space-owner/space-owner/reviews";
  return apiClient.getQuery(endpoint);
};

export default useReviewList;
