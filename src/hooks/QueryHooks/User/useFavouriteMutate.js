import APIClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useFavouriteMutate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: (data) => {
      return apiClient.post("/customer/space/addFavoriteSpace", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/customer/space/dashboard_space_list"],
        queryKey: ["/customer/space/favoriteSpaceList"],
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

export default useFavouriteMutate;
