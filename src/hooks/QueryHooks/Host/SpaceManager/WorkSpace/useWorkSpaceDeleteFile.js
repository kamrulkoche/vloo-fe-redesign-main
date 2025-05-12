import APIClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useWorkSpaceDeleteFile = () => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/space-owner/work-space/delete-file", data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.reload();
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

export default useWorkSpaceDeleteFile;
