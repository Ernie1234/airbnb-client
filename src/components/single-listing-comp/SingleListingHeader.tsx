import { useFavourites } from "@/hooks/useFavourite";
import Heading from "../shared/Heading";
import { Button } from "../ui/button";
import { FiShare } from "react-icons/fi";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  listingId: string;
}

export const SingleListingHeader = ({ title, listingId }: Props) => {
  const {
    favourites,
    isLoading,
    isError,
    error,
    addFavouriteMutation,
    removeFavouriteMutation,
  } = useFavourites();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const isFavourite = favourites?.some((fav) => fav.id === listingId);

  const handleAddFavourite = () => {
    addFavouriteMutation.mutate(listingId);
  };

  const handleRemoveFavourite = () => {
    removeFavouriteMutation.mutate(listingId);
  };

  return (
    <div className="flex gap-8 items-center justify-between">
      <Heading title={title} />
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          className="group transition-all duration-500 flex items-center"
        >
          <FiShare />
          <span className="underline underline-offset-1 group-hover:no-underline font-[700]">
            Share
          </span>
        </Button>
        <Button
          onClick={isFavourite ? handleRemoveFavourite : handleAddFavourite}
          variant="ghost"
          className="group transition-all duration-500 flex items-center"
        >
          <Heart
            className={cn(
              "",
              isFavourite ? "fill-red-500 text-red-700" : "fill-transparent"
            )}
          />
          <span className="font-[700]"> {isFavourite ? "Unsave" : "Save"}</span>
        </Button>
      </div>
    </div>
  );
};
