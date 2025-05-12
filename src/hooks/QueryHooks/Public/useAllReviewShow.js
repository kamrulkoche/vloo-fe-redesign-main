import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useAllReviewShow = (data) => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: ["/public/space/space_review_all", data],
    enabled: true,
    queryFn: () => {
      const endpoint = data
        ? `/public/space/space_review_all?space_id=${data}`
        : "/public/space/space_review_all";
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

export default useAllReviewShow;
