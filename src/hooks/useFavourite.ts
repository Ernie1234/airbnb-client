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
    addFavourite,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favourites"]);
      },
    }
  );

  const removeFavouriteMutation = useMutation<
    AddFavouriteResponse,
    Error,
    string
  >(removeFavourite, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["favourites"]);
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
