import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { useMemo } from "react";
import { HeartBtn } from "./HeartBtn";
import { formatPrice, timeAgo } from "@/lib/utils";
import type { IListing } from "@/types/listing";
import type { IReservation } from "@/types/reservation";
import type { IUser } from "@/types/user";
import AppBtn from "./AppBtn";

interface Props {
  listing: IListing;
  reservation?: IReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: IUser | null;
}

export const ListingCard: React.FC<Props> = ({
  // actionId,
  listing,
  onAction,
  reservation,
  disabled,
  actionLabel,
  currentUser,
}) => {
  //   const router = useRouter();

  const handleCancel = () => {
    console.log("first action canceled");
  };

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  console.log(listing);

  return (
    <Link
      key={listing._id}
      to={`/$listingId`}
      params={{ listingId: listing._id }}
      className="col-span-1 cursor-pointer group block"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square  bg-purple-300 block w-full relative overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition-all duration-500"
            alt={listing.title}
            src={listing.imageSrc}
          />
          <div className="absolute top-3 right-3">
            <HeartBtn listingId={listing._id} currentUser={currentUser?.id} />
          </div>
        </div>

        <div className="font-medium text-base font-display">
          <p className="line-clamp-1 font-semibold">{listing.title}</p>
          <p className="text-muted-foreground line-clamp-1">
            {timeAgo(listing.createdAt)}
          </p>
          <p className="text-muted-foreground">
            {reservationDate || listing.category}
          </p>
          <p className="">
            ${formatPrice(listing.price)}{" "}
            <span className="text-sm text-muted-foreground font-display">
              night
            </span>
          </p>
          {onAction && actionLabel && (
            <AppBtn
              disabled={disabled}
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </Link>
  );
};
