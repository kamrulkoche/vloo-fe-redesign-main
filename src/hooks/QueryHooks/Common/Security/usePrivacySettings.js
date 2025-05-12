import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const usePrivacySettings = (type) => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      const endpoint =
        type === "user"
          ? "/customer/setting/privacySetting"
          : "/space-owner/setting/privacySetting";

      return apiClient.post(endpoint, data);
    },
    onSuccess: () => {},
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

export default usePrivacySettings;
