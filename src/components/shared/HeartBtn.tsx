import { useFavourites } from "@/hooks/useFavourite";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
interface Props {
  currentUser: string | undefined;
  listingId: string;
}

export const HeartBtn: React.FC<Props> = ({ listingId }) => {
  const {
    favourites,
    isLoading,
    isError,
    error,
    addFavouriteMutation,
    removeFavouriteMutation,
  } = useFavourites();

  const isFavourite = favourites?.some((fav) => fav.id === listingId);

  const handleAddFavourite: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    console.log("Add Favourite Clicked");
    addFavouriteMutation.mutate(listingId);
  };

  const handleRemoveFavourite: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.stopPropagation();
    removeFavouriteMutation.mutate(listingId);
  };

  return (
    <div
      onClick={isFavourite ? handleRemoveFavourite : handleAddFavourite}
      className="relative hover:opacity-80 transition-all cursor-pointer duration-500"
    >
      {isError && <div>Error: {error?.message}</div>}
      <Heart
        className={cn(
          "absolute -top-[2px] -right-[2px] duration-500 transition-all",
          isFavourite
            ? "fill-red-500 text-red-700"
            : "fill-slate-800/30 text-gray-200",
          isLoading && "animate-spin"
        )}
      />
      {/* <span className="font-[700]"> {isFavourite ? "Unsave" : "Save"}</span> */}
    </div>
  );
};
