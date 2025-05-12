import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useLeadMutate = () => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/public/lead-form/store", data);
    },
    onSuccess: () => {
      toast.success(
        "Thank you for your response. We will contact with you soon.",
      );
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

export default useLeadMutate;
