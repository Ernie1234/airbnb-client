import { useRouter } from "@tanstack/react-router";
import Heading from "./Heading";
import AppBtn from "./AppBtn";

interface Props {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

export const EmptyListing = ({
  title = "No exact matches found",
  subTitle = "Try changing or removing some of your filters.",
  showReset,
}: Props) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <AppBtn
            outline
            label="Remove all filters"
            onClick={() => router.navigate({ to: "/" })}
          />
        )}
      </div>
    </div>
  );
};
