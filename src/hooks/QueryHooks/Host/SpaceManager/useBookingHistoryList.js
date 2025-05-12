import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useBookingHistoryList = () => {
  const endpoint = "/space-owner/space-owner/booking_history";
  return apiClient.getQuery(endpoint);
};

export default useBookingHistoryList;
