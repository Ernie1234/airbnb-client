import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFavourites } from "@/hooks/useFavourite";
import { cn } from "@/lib/utils";
import useLoginModal from "@/hooks/useLoginModal";

interface Props {
  listingId: string;
}

export const HeartBtn: React.FC<Props> = ({ listingId }) => {
  const { isLoggedIn, isLoading: userLoading } = useAuth();
  const loginModal = useLoginModal();

  const {
    favourites,
    isLoading,
    isError,
    error,
    addFavouriteMutation,
    removeFavouriteMutation,
  } = useFavourites(isLoggedIn ?? undefined);

  const isFavourite = favourites?.some((fav) => fav.id === listingId);

  const handleFavouriteAction: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    if (!isLoggedIn) {
      loginModal.onOpen();
      return;
    }

    if (isFavourite) {
      removeFavouriteMutation.mutate(listingId);
    } else {
      addFavouriteMutation.mutate(listingId);
    }
  };

  return (
    <div
      onClick={handleFavouriteAction}
      className="relative hover:opacity-80 transition-all cursor-pointer duration-500"
    >
      {isLoggedIn && isError && <div>Error: {error?.message}</div>}
      <Heart
        className={cn(
          "absolute -top-[2px] -right-[2px] duration-1000 transition-all",
          isFavourite
            ? "fill-red-500 text-red-700"
            : "fill-slate-800/30 text-gray-200",
          (isLoading || userLoading) && "animate-spin" // Show loading animation if either favourites or user data is loading
        )}
      />
      {/* <span className="font-[700]"> {isFavourite ? "Unsave" : "Save"}</span> */}
    </div>
  );
};
