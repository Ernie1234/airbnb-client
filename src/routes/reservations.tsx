import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getReservations } from "@/services/reservations";
import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { EmptyListing } from "@/components/shared/EmptyListing";
import Container from "@/components/shared/Container";
import { ListingCard } from "@/components/shared/ListingCard";
import type { IReservationApiResponse } from "@/types/reservation";

export const Route = createFileRoute("/reservations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isLoading } = useQuery<IReservationApiResponse>({
    queryKey: ["getReservations"],
    queryFn: async () => await getReservations(),
  });

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (!data || data?.reservations?.length === 0)
    return <EmptyListing showReset />;

  console.log("Reservation Listings:", data.reservations);
  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {data.reservations.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
}
