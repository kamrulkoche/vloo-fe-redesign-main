import APIClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useSpaceUpdateMutate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/space-owner/space/update", data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      // queryClient.invalidateQueries({
      //   queryKey: ["/space-owner/space/list"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["/space-owner/space/showSpace"],
      // });
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

export default useSpaceUpdateMutate;
