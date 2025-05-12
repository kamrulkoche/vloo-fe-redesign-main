import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useAccountUpdate = (type) => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      const endpoint =
        type === "user"
          ? "/customer/customer/update"
          : "/space-owner/space-owner/update";

      return apiClient.post(endpoint, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
      );
    },
  });
};

export default useAccountUpdate;
