import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as z from "zod";

import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { getAllListing } from "@/services/listings";
import Container from "@/components/shared/Container";
import { EmptyListing } from "@/components/shared/EmptyListing";
import { ListingCard } from "@/components/shared/ListingCard";
import { useSearchStore } from "@/hooks/useSearchStore";

const searchParamsSchema = z.object({
  category: z.string().optional(),
  location: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: searchParamsSchema,
});

function App() {
  const { category } = useSearchStore(); // Get the current category from Zustand

  const { data, error, isLoading } = useQuery({
    queryKey: ["getAllListing", category],
    queryFn: async () => await getAllListing(category),
  });

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (!data || data.data.length === 0) return <EmptyListing showReset />;

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {data.data.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
}
