import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useBookingCalendarShow = (data) => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: ["/space-owner/space-owner/bookingCalender", data],
    enabled: !!data,
    queryFn: () => {
      const endpoint = data
        ? `/space-owner/space-owner/bookingCalender?space_id=${data}`
        : "/space-owner/space-owner/bookingCalender";
      return apiClient.getAll(endpoint);
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    },
  });
};

export default useBookingCalendarShow;
