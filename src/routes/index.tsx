import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { getAllListing } from "@/services/listings";
import { Favorite } from "@/components/shared/Favourite";

import { formatDistanceToNow, parseISO } from "date-fns";
import Container from "@/components/shared/Container";

function timeAgo(dateString: string): string {
  const date = parseISO(dateString);
  const distance = formatDistanceToNow(date, { addSuffix: true });
  return `Added ${distance}`;
}

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getAllListing"],
    queryFn: async () => await getAllListing(),
  });

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No listings found.</div>;
  console.log("Listing: ", data);

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.data.map((listing: any) => (
          <Link
            key={listing.id}
            to={`/$listingId`}
            params={{ listingId: listing.id }}
            className="w-[350px] relative group"
          >
            <Favorite />
            <img
              src={listing.imageSrc}
              alt={listing.title}
              className="min-w-[280px] min-h-[280px] object-cover w-full h-auto rounded-xl"
            />
            <div className="font-medium text-base">
              <p className="">{listing.title}</p>
              <p className="text-muted-foreground">
                {timeAgo(listing.createdAt)}
              </p>
              <p className="text-muted-foreground">
                {timeAgo(listing.createdAt)}
              </p>

              <p className="">
                ${listing.price}{" "}
                <span className="text-sm text-muted-foreground">night</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
