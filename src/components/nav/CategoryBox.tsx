import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import type { ComponentType } from "react";

interface Props {
  label: string;
  desc: string;
  icon: ComponentType<{ size: number }>;
  selected?: boolean;
}

export const CategoryBox: React.FC<Props> = ({
  desc,
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Access current query parameters
    const currentCategories = router.state?.query?.category || [];

    // Ensure currentCategories is an array
    const categoriesArray = Array.isArray(currentCategories)
      ? currentCategories
      : [currentCategories];

    if (categoriesArray.includes(label)) {
      // Remove the category if it exists
      const updatedCategories = categoriesArray.filter((cat) => cat !== label);
      router.setQuery({
        category: updatedCategories.length > 0 ? updatedCategories : undefined,
      });
    } else {
      // Add the category if it doesn't exist
      const updatedCategories = [...categoriesArray, label];
      router.setQuery({ category: updatedCategories });
    }
  };

  return (
    <div
      onClick={handleClick} // Call handleClick on click
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2 border-b-2 hover:text-neutral-800 transition-all cursor-pointer duration-500",
        selected ? "border-b-neutral-800" : "border-transparent",
        selected ? "text-neutral-800" : "text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
      <div className="text-xs text-neutral-400 aria-readonly:block hidden">
        {desc}
      </div>
      {/* Optional description display */}
    </div>
  );
};
