import {
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import { useFavourites } from "@/hooks/useFavourite";
import Heading from "../shared/Heading";
import { Button } from "../ui/button";
import { FiShare } from "react-icons/fi";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import useLoginModal from "@/hooks/useLoginModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
  title: string;
  listingId: string;
}

export const SingleListingHeader = ({ title, listingId }: Props) => {
  const { isLoggedIn, isLoading: userLoading } = useAuth();
  const loginModal = useLoginModal();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
        <Dialog>
          <DialogTrigger asChild>
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
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share this listing</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-4 py-4">
              <TwitterShareButton url={currentUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <WhatsappShareButton url={currentUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <EmailShareButton url={currentUrl} subject={title}>
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 p-2 border rounded-md text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  toast.success("Link copied to clipboard!");
                }}
              >
                Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
            <div onClick={() => loginModal.onOpen()} className="flex gap-2">
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
