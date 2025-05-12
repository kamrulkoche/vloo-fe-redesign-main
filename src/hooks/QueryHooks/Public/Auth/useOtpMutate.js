import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useOtpMutate = () => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/public/sign-up/otpVerify", data);
    },
    onSuccess: (data) => {
      toast.success("OTP verified successfully. Please log in to continue.");
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

export default useOtpMutate;
