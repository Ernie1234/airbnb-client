import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
  type AddFavouriteResponse,
  type GetFavouritesResponse,
} from "@/services/favouriteApi";

import { toast } from "sonner";

const queryClient = new QueryClient();

export const useFavourites = () => {
  const {
    data: favouritesResponse,
    isLoading,
    isError,
    error,
  } = useQuery<GetFavouritesResponse, Error>({
    queryKey: ["getFavourites"],
    queryFn: getFavourites,
  });

  const favourites = favouritesResponse?.data || [];

  const addFavouriteMutation = useMutation<AddFavouriteResponse, Error, string>(
    {
      mutationFn: (listingId) => addFavourite(listingId),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["getFavourites"] });
        toast.success("Successfully", {
          description: data.message,
          position: "top-right",
          duration: 5000,
          richColors: true,
        });
      },
      onError: (error) => {
        // Handle error (e.g., show a toast notification)
        toast.error("An error occurred", {
          description: error.message,
          position: "top-right",
          duration: 5000,
          richColors: true,
        });
        console.error("Error adding favourite:", error);
      },
    }
  );

  const removeFavouriteMutation = useMutation<
    AddFavouriteResponse,
    Error,
    string
  >({
    mutationFn: (listingId) => removeFavourite(listingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getFavourites"] });
      toast.info("Successfully", {
        description: data.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    },
    onError: (error) => {
      // Handle error (e.g., show a toast notification)
      toast.error("An error occurred", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
      console.error("Error removing favourite:", error);
    },
  });

  return {
    favourites,
    isLoading,
    isError,
    error,
    addFavouriteMutation,
    removeFavouriteMutation,
  };
};
