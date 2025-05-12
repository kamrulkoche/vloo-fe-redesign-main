import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useBookingHistoryList = () => {
  const endpoint = "/customer/work-space-booking/bookingHistory";
  return apiClient.getQuery(endpoint);
};

export default useBookingHistoryList;
