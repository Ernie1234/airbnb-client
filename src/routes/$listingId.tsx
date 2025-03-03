import { getListingById } from "@/services/listings";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/$listingId")({
  component: RouteComponent,
  loader: async ({ params: { listingId } }) => {
    const listing = await getListingById(listingId);
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
            // Invalidate the route to reload the loader, which will also reset the error boundary
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
    <div className="min-h-dvh">
      <div className="lg:max-w-10/12 p-5 mx-auto">
        <img
          src={listing.data.imageSrc}
          alt={listing.data.title}
          className="rounded-xl w-full "
        />
        <div className="mt-5">
          <h1>{listing.data.title}</h1>
          <p>{listing.data.description}</p>
          <p>Price: ${listing.data.price}</p>
          <p>Location: {listing.data.location}</p>
          <p>Host: {listing.data.hostName}</p>
        </div>
      </div>
    </div>
  );
}
