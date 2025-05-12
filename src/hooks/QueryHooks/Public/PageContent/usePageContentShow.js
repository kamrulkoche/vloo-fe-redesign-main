import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const usePageContentShow = (data) => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: ["/public/page/page", data],
    enabled: true,
    queryFn: () => {
      const endpoint = data
        ? `/public/page/page?id=${data}`
        : "/public/page/page";
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

export default usePageContentShow;
