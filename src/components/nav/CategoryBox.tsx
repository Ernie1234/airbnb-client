import { useSearchStore } from "@/hooks/useSearchStore";
import { useNavigate } from "@tanstack/react-router";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

interface Props {
  label: string;
  desc: string;
  icon: ComponentType<{ size: number }>;
  // selected?: boolean;
}

export const CategoryBox: React.FC<Props> = ({ desc, icon: Icon, label }) => {
  const { category, toggleCategory } = useSearchStore();
  const navigate = useNavigate();

  const handleClick = () => {
    toggleCategory(label);
    navigate({
      search: { category: label === category ? undefined : label } as any,
    });
  };

  const selected = category === label;
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2 border-b-2 hover:text-neutral-800 transition-all cursor-pointer duration-500",
        selected ? "border-b-neutral-800" : "border-transparent",
        selected ? "text-neutral-800" : "text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm text-nowrap">{label}</div>
      <div className="text-xs text-neutral-400 aria-readonly:block hidden">
        {desc}
      </div>
      {/* Optional description display */}
    </div>
  );
};
