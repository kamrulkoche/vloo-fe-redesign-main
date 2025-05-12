import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useCitySpaceShow = (type, data) => {
  const apiClient = new APIClient();

  const baseEndpoint =
    type === "user"
      ? "/customer/space/city_space_list"
      : "/public/space/city_space_list";

  return useQuery({
    queryKey: [baseEndpoint, data],
    enabled: !!data,
    queryFn: () => {
      const endpoint = data ? `${baseEndpoint}?city=${data}` : baseEndpoint;
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

export default useCitySpaceShow;
