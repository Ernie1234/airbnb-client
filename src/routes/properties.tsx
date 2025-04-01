import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllListing } from "@/services/listings";
import type { IListing, IPropertyResponse } from "@/types/listing";

import Container from "@/components/shared/Container";
import { ListingCard } from "@/components/shared/ListingCard";
import { useAuth } from "@/hooks/useAuth";
import { EmptyListing } from "@/components/shared/EmptyListing";

export const Route = createFileRoute("/properties")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading: userLoading, user } = useAuth();
  const { data, error, isLoading } = useQuery<IPropertyResponse>({
    queryKey: ["getReservations"],
    queryFn: async () => await getAllListing(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (userLoading) return <div>Loading...</div>;
  if (!data || data?.data?.listings?.length === 0)
    return <EmptyListing showReset />;
  if (!user) return <div>Loading...</div>;

  const myProperties: IListing[] =
    data?.data?.listings?.filter((listing: any) =>
      user?.Listings?.includes(listing.id)
    ) || [];

  if (!myProperties.length)
    return (
      <EmptyListing
        title="You have no Listing yet!"
        subTitle="Try adding some listing"
        showReset
      />
    );

  console.log("users: ", user);
  console.log("myProperties", data);

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {myProperties.map((listing: IListing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
}
