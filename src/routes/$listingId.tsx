import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FiShare } from "react-icons/fi";

import { getListingById } from "@/services/listings";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Dot, Heart } from "lucide-react";
import type { IPropertyResponse } from "@/types/listing";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/$listingId")({
  component: RouteComponent,
  loader: async ({ params: { listingId } }) => {
    const listing: IPropertyResponse = await getListingById(listingId);
    return {
      listing,
    };
  },
  onError: ({ error }) => {
    console.error(error);
  },
  errorComponent: ({ error, reset }) => {
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
  console.log("Listing in listing details: ", listing);
  return (
    <div className="min-h-dvh font-display ">
      <div className="lg:max-w-10/12 p-5 mx-auto space-y-4">
        <div className="flex gap-8 items-center justify-between">
          <Heading title={listing.data.title} />
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
              variant="ghost"
              className="group transition-all duration-500 flex items-center"
            >
              <Heart />
              <span className="font-[700]">Save</span>
            </Button>
          </div>
        </div>
        <img
          src={listing.data.imageSrc}
          alt={listing.data.title}
          className="rounded-xl w-full"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between mt-8">
          <div className="font-primary md:col-span-2 bg-amber-500">
            <p>{listing.data.location}</p>
            <div className="flex items-center gap-0.5">
              <span className="">{listing.data.guestCount} guests</span>
              <Dot />
              <span className="">{listing.data.bathroomCount} bathrooms</span>
              <Dot />
              <span className="">{listing.data.roomCount} bedrooms</span>
            </div>
            <p className="flex items-center"></p>
            <Separator />
          </div>
          <div className="bg-blue-4000 w-full sticky top-8">hello world</div>
        </div>
      </div>
    </div>
  );
}
