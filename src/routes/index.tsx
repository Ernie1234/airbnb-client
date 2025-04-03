import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as z from "zod";
import { useInView } from "react-intersection-observer";

import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { getAllListing } from "@/services/listings";
import Container from "@/components/shared/Container";
import { EmptyListing } from "@/components/shared/EmptyListing";
import { ListingCard } from "@/components/shared/ListingCard";
import { useSearchStore } from "@/hooks/useSearchStore";
import { useEffect } from "react";

const searchParamsSchema = z.object({
  category: z.string().optional(),
  location: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: searchParamsSchema,
});

function App() {
  const { category, location } = useSearchStore();
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllListing", category, location],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllListing(category, location, pageParam);
      return response.data; // Access the data property from response
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (total, page) => total + page.listings.length,
        0
      );
      const hasMore = totalLoaded < lastPage.total;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all listings from all pages
  const allListings = data?.pages.flatMap((page) => page.listings) || [];

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (allListings.length === 0) return <EmptyListing showReset />;

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {allListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={ref} className="flex justify-center p-8">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-primary text-white rounded-lg"
            disabled={isFetchingNextPage}
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-500">You've reached the end</p>
        )}
      </div>
    </Container>
  );
}
