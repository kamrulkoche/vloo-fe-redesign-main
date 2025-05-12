import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useAccountShow = (type, data) => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: [
      type === "user"
        ? "/customer/customer/show"
        : "/space-owner/space-owner/show",
      data,
    ],
    enabled: !!type,
    queryFn: () => {
      const endpoint =
        type === "user"
          ? `/customer/customer/show?uuid=${data}`
          : `/space-owner/space-owner/show?uuid=${data}`;

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

export default useAccountShow;
