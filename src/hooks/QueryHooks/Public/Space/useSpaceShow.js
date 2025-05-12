import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useSpaceShow = (type, data) => {
  const apiClient = new APIClient();

  const baseEndpoint =
    type === "user"
      ? "/customer/space/dashboard_space_show"
      : "/public/space/dashboard_space_show";

  return useQuery({
    queryKey: [baseEndpoint, data],
    enabled: !!data,
    queryFn: () => {
      const endpoint = data ? `${baseEndpoint}?uuid=${data}` : baseEndpoint;
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
