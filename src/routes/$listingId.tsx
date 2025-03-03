import { getListingById } from "@/services/listings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$listingId")({
  component: RouteComponent,
  loader: async ({ params: { listingId } }) => {
    const listing = await getListingById(listingId);
    return {
      listing,
    };
  },
});

function RouteComponent() {
  const { listing } = Route.useLoaderData();
  console.log("Listing in listing details: ", listing);
  return <div>Hello "/$listingId"!</div>;
}
