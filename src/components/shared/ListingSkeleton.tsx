import { Skeleton } from "@/components/ui/skeleton";
import Container from "./Container";

export function ListingSkeleton() {
  return (
    <Container>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="col-span-1 flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
