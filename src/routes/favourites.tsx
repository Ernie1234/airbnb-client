import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/shared/Container";
import { ListingCard } from "@/components/shared/ListingCard";
import { getAllListing } from "@/services/listings";
import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { EmptyListing } from "@/components/shared/EmptyListing";
import { useAuth } from "@/hooks/useAuth";
import type { IListing } from "@/types/listing";

export const Route = createFileRoute("/favourites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading: userLoading, user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["getAllListing"],
    // queryFn: async () => await getAllListing(),
    queryFn: async () => await getAllListing(),
  });

  if (isLoading || userLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (!data || data?.data?.length === 0) return <EmptyListing showReset />;

  const favoriteListings: IListing[] =
    data?.data?.listings?.filter((listing: any) =>
      user?.favouriteIds?.includes(listing.id)
    ) || [];

  if (!favoriteListings.length) return <EmptyListing showReset />;

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {favoriteListings.map((listing: IListing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
}
