import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { getAllListing } from "@/services/listings";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";

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
    <div className="text-4xl font-bold p-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((listing: any) => (
          <div className="w-[350px] relative group" key={listing.id}>
            <Heart className="absolute top-2 right-2 text-gray-200 hover:scale-110 duration-300 transition-all fill-gray-400" />
            <img
              src={listing.imageSrc}
              alt={listing.title}
              className="min-w-[280px] min-h-[280px] object-cover w-full h-auto rounded-xl"
            />
            <div className="">
              <p className="text-xl font-semibold">{listing.title}</p>
              <p className="text-sm font-light">{listing.description}</p>
              <p className="font-medium text-base">
                ${listing.price}{" "}
                <span className="text-sm font-light">night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
