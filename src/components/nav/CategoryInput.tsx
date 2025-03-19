import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

interface Props {
  onClick: (value: string) => void;
  label: string;
  selected?: boolean;
  icon: ComponentType<{ size: number }>;
}

const CategoryInput = ({ icon: Icon, label, selected, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        selected ? "border-black" : "border-neutral-200"
      )}
    >
      <Icon size={24} />
      <div className="font-semibold text-sm">{label}</div>
    </div>
  );
};

export default CategoryInput;
