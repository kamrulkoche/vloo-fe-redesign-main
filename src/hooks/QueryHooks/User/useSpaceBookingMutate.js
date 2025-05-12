import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSpaceBookingMutate = () => {
  const apiClient = new APIClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/customer/work-space-booking/store", data);
    },
    onSuccess: (response) => {
      if (response?.data?.strip_payment_url?.original?.url) {
        router.replace(response?.data?.strip_payment_url?.original?.url);
      } else {
        toast.error("Payment url is not available. Please try again.");
      }
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

export default useSpaceBookingMutate;
