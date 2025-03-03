import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { getAllListing } from "@/services/listings";
import Container from "@/components/shared/Container";
import { EmptyListing } from "@/components/shared/EmptyListing";
import { ListingCard } from "@/components/shared/ListingCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getAllListing"],
    queryFn: async () => await getAllListing(),
  });

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (!data || data.data.length === 0) return <EmptyListing showReset />;
  console.log("Listing: ", data);

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {data.data.map((listing: any) => {
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </div>
    </Container>
  );
}
