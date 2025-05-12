import APIClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useSpaceStepMutate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/space-owner/space/stepUpdate", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/space-owner/space/showSpace"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/space-owner/space-owner/spaceOwnerDashboard"],
      });
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

export default useSpaceStepMutate;
