import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteReservation, getReservations } from "@/services/reservations";
import { ListingSkeleton } from "@/components/shared/ListingSkeleton";
import { EmptyListing } from "@/components/shared/EmptyListing";
import Container from "@/components/shared/Container";
import type {
  IReservationApiResponse,
  IReservationData,
} from "@/types/reservation";
import { ReservationCard } from "@/components/shared/ReservationCard";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const Route = createFileRoute("/reservations")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<IReservationApiResponse>({
    queryKey: ["getReservations"],
    queryFn: async () => await getReservations(),
  });

  const { mutate: deleteReservationMutation, isPending } = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReservations"] });
      toast.success("Reservation deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <ListingSkeleton />;
  if (error) return <div className="p-4">Error: {error.message}</div>;
  if (!data || data?.data.reservations?.length === 0)
    return <EmptyListing showReset />;

  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {data.data.reservations?.map((listing: IReservationData) => (
          <ErrorBoundary
            key={`reservation-${listing.id}`}
            fallback={
              <div className="text-red-500">Error loading reservation</div>
            }
          >
            <ReservationCard
              // key={`reservation-${listing.id}`}
              listing={listing}
              actionLabel="Cancel Reservation"
              disabled={isPending}
              onAction={deleteReservationMutation}
            />
          </ErrorBoundary>
        ))}
      </div>
    </Container>
  );
}
