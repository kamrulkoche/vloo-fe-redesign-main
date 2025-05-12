import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useReviewList = () => {
  const endpoint = "/customer/space/userSpaceReview";
  return apiClient.getQuery(endpoint);
};

export default useReviewList;
