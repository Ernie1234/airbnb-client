import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { useMemo, useState } from "react";

import { HeartBtn } from "./HeartBtn";
import { cn, formatPrice, getTotalDays, timeAgo } from "@/lib/utils";
import type { IReservationData } from "@/types/reservation";
import type { IUser } from "@/types/user";
import AppBtn from "./AppBtn";

interface Props {
  listing: IReservationData;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  currentUser?: IUser | null;
}

export const ReservationCard: React.FC<Props> = ({
  // actionId,
  listing,
  onAction,
  disabled,
  actionLabel,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const reservationDate = useMemo(() => {
    if (!listing.startDate || !listing.endDate) {
      return null;
    }
    const start = new Date(listing.startDate);
    const end = new Date(listing.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [listing.startDate, listing.endDate]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.listingId.imageSrc.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.listingId.imageSrc.length - 1 : prevIndex - 1
    );
  };
  return (
    <Link
      //   key={listing.id}
      to={`/$listingId`}
      params={{ listingId: listing.id }}
      className="col-span-1 cursor-pointer group block"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square  bg-purple-300 block w-full relative overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition-all duration-500"
            alt={listing.listingId.title}
            src={listing.listingId.imageSrc[currentImageIndex]}
          />
          <div className="absolute top-3 right-3">
            <HeartBtn listingId={listing.id} />
          </div>
          {listing.listingId.imageSrc.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePrev();
                }}
                className={cn(
                  "hidden group-hover:block absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all duration-300",
                  currentImageIndex === 0 ? "opacity-0" : "opacity-100"
                )}
                style={{
                  visibility: currentImageIndex === 0 ? "hidden" : "visible",
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={cn(
                  "hidden group-hover:block absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all duration-300",
                  currentImageIndex === listing.listingId.imageSrc.length - 1
                    ? "opacity-0"
                    : "opacity-100"
                )}
                style={{
                  visibility:
                    currentImageIndex === listing.listingId.imageSrc.length - 1
                      ? "hidden"
                      : "visible",
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="font-medium text-base font-display">
          <p className="line-clamp-1 font-semibold">
            {listing.listingId.title}
          </p>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            Reserved {timeAgo(listing.createdAt)}
          </p>
          <p className="text-muted-foreground text-sm">
            {reservationDate || listing.listingId.category}
          </p>
          <p className="">
            ${formatPrice(listing.totalPrice)}{" "}
            <span className="text-sm text-muted-foreground font-display">
              {`for ${getTotalDays(listing.startDate, listing.endDate)} nights`}
            </span>
          </p>
          <div className="pt-3">
            {onAction && actionLabel && (
              <AppBtn
                disabled={disabled}
                label={actionLabel}
                onClick={(e) => {
                  e.preventDefault();
                  onAction(listing.id);
                }}
                small
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
