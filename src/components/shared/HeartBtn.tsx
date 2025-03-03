import { cn } from "@/lib/utils";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  currentUser: string | undefined;
  listingId: string;
}

export const HeartBtn: React.FC<Props> = ({ currentUser, listingId }) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition-all cursor-pointer duration-500"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={cn("", hasFavorited ? "fillrose500" : "fill-neutral-500/70")}
      />
    </div>
  );
};
