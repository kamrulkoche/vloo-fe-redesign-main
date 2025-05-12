import APIClient from "@/services/api-client";

const apiClient = new APIClient();

const useActiveBookingList = () => {
  const endpoint = "/customer/work-space-booking/activeBooking";
  return apiClient.getQuery(endpoint);
};

export default useActiveBookingList;
