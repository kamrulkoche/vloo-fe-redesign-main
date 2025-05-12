import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useSpaceAvailability = (data) => {
  const apiClient = new APIClient();

  const baseEndpoint = "/public/space/workspace_availability_calendar";

  return useQuery({
    queryKey: [baseEndpoint, data],
    enabled: !!data,
    queryFn: () => {
      const endpoint = data
        ? `${baseEndpoint}?work_space_booking=${data}`
        : baseEndpoint;
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

export default useSpaceAvailability;
