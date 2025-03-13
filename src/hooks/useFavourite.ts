import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
  type AddFavouriteResponse,
  type GetFavouritesResponse,
} from "@/services/favouriteApi";

const queryClient = new QueryClient();

export const useFavourites = () => {
  const {
    data: favouritesResponse,
    isLoading,
    isError,
    error,
  } = useQuery<GetFavouritesResponse, Error>({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  const favourites = favouritesResponse?.data || [];

  const addFavouriteMutation = useMutation<AddFavouriteResponse, Error, string>(
    {
      mutationFn: addFavourite,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favourites"] });
      },
    }
  );

  const removeFavouriteMutation = useMutation<
    AddFavouriteResponse,
    Error,
    string
  >({
    mutationFn: removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
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
