import { createFileRoute, useRouter } from "@tanstack/react-router";
import { BedDouble, Dot, Image, Key, MapPin } from "lucide-react";

import { getListingById } from "@/services/listings";
import Heading from "@/components/shared/Heading";
import type { ISingleListingsResponse } from "@/types/listing";
import { Separator } from "@/components/ui/separator";
import { ListingReviews } from "@/components/single-listing-comp/ListingReviews";
import { ListingComments } from "@/components/single-listing-comp/ListingComments";
import { ListingMap } from "@/components/single-listing-comp/ListingMap";
import { SingleListingHeader } from "@/components/single-listing-comp/SingleListingHeader";
import { timeAgo } from "@/lib/utils";
import ReservationFormCard from "@/components/shared/ReservationFormCard";

export const Route = createFileRoute("/$listingId")({
  component: RouteComponent,
  loader: async ({ params: { listingId } }) => {
    const listing: ISingleListingsResponse = await getListingById(listingId);
    return {
      listing,
    };
  },

  errorComponent: ({ error }) => {
    const router = useRouter();

    return (
      <div>
        {error.message}
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          retry
        </button>
      </div>
    );
  },
});

function RouteComponent() {
  const { listing } = Route.useLoaderData();

  return (
    <div className="min-h-dvh font-display">
      <div className="lg:max-w-10/12 p-5 mx-auto space-y-4 relative">
        <SingleListingHeader
          title={listing.data.title}
          listingId={listing.data.id}
        />
        <img
          src={listing.data.imageSrc[0]}
          alt={listing.data.title}
          className="rounded-xl w-full"
        />
        <div className="flex gap-8 justify-between mt-8 relative">
          <div className="font-primary md:col-span-2">
            <div className="flex flex-col pb-5">
              <Heading title={listing.data.location} />
              <div className="flex items-center gap-0.5">
                <span className="">{listing.data.guestCount} guests</span>
                <Dot />
                <span className="">{listing.data.bathroomCount} bathrooms</span>
                <Dot />
                <span className="">{listing.data.roomCount} bedrooms</span>
              </div>
              <p className="flex items-center"></p>
            </div>
            <Separator />
            <div className="flex items-center gap-5 py-5">
              <img
                src="/Images/placeholder1.jpg"
                alt="avatar"
                className="rounded-full h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">
                  Hosted by {listing.data.userId.name}
                </h3>
                <p>Created {timeAgo(listing.data.userId.createdAt)}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-5 py-5">
              <div className="flex gap-5 items-center">
                <div className="p-3">
                  <Key />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium">Great check-in experience</h3>
                  <p>Recent guests loved the smooth start to this stay.</p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <div className="p-3">
                  <MapPin />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium">Beautiful area</h3>
                  <p>Guests love this home’s scenic location.</p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <div className="p-3">
                  <Image />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium">Mountain and valley views</h3>
                  <p>Soak up the views during your stay.</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex gap-5 py-5">{listing.data.description}</div>
            <Separator />
            <div className="flex flex-col gap-5 py-5">
              <Heading title="Where you'll sleep" />
              <div className="flex gap-2 flex-col border-2 rounded-xl max-w-fit p-4">
                <BedDouble />
                <p>Bedrooms</p>
                <p>{listing.data.roomCount} bed each</p>
              </div>
            </div>
            {/* the last Separator should be removed later */}
            <Separator />
          </div>
          <div className="bg-blue-4000 sticky top-8">
            <ReservationFormCard listing={listing} />
          </div>
        </div>

        <Separator />
        <ListingReviews />
        <Separator />
        <ListingComments listingId={listing.data.id} />
        <Separator />
        <ListingMap />
      </div>
    </div>
  );
}
