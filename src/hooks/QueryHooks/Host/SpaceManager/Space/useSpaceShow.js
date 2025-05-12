import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useSpaceShow = (data) => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: ["/space-owner/space/showSpace", data],
    enabled: !!data,
    queryFn: () => {
      const endpoint = data
        ? `/space-owner/space/showSpace?uuid=${data}`
        : "/space-owner/space/showSpace";
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

export default useSpaceShow;
