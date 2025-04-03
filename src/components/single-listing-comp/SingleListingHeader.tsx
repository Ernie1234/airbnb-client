import { useFavourites } from "@/hooks/useFavourite";
import Heading from "../shared/Heading";
import { Button } from "../ui/button";
import { FiShare } from "react-icons/fi";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import useLoginModal from "@/hooks/useLoginModal";

interface Props {
  title: string;
  listingId: string;
}

export const SingleListingHeader = ({ title, listingId }: Props) => {
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

  const handleFavouriteAction = () => {
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
    <div className="flex gap-8 items-center justify-between">
      <Heading title={title} />
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          className="group transition-all duration-500 flex items-center"
          aria-label="Share this listing"
        >
          <FiShare />
          <span className="underline underline-offset-1 group-hover:no-underline font-[700]">
            Share
          </span>
        </Button>
        <Button
          onClick={handleFavouriteAction}
          variant="ghost"
          className="group transition-all duration-500 flex items-center"
          aria-label={isFavourite ? "Unsave this listing" : "Save this listing"}
          disabled={isLoading || userLoading}
        >
          {isLoading || userLoading ? (
            <Loader2 className="h-4 w-4" />
          ) : !isLoggedIn ? (
            <div onClick={() => loginModal.onOpen()}>
              <Heart className={cn("h-5 w-5 fill-transparent")} />
              <span className="font-[700]">Save</span>
            </div>
          ) : (
            <>
              <Heart
                className={cn(
                  "h-5 w-5",
                  isFavourite ? "fill-red-500 text-red-700" : "fill-transparent"
                )}
              />
              <span className="font-[700]">
                {isFavourite ? "Unsave" : "Save"}
              </span>
            </>
          )}
        </Button>
      </div>
      {isError && (
        <div className="text-red-500 text-sm mt-2">Error: {error?.message}</div>
      )}
    </div>
  );
};
