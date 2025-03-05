import {
  CircleCheck,
  Dot,
  Key,
  Map,
  MessageSquare,
  Star,
  Tag,
} from "lucide-react";
import { PiSprayBottle } from "react-icons/pi";

import { cn } from "@/lib/utils";
import Heading from "../shared/Heading";
import { Separator } from "../ui/separator";

export const ListingReviews = () => {
  return (
    <div className="flex flex-col space-y-8 py-8">
      <div className="text-2xl font-bold flex items-center">
        <Star size={20} className="fill-inherit mr-2" />
        <span>4.94</span>
        <Dot size={28} className="w-fit" />
        <span>196 reviews</span>
      </div>
      <div className="flex gap-8 justify-between items-center h-28">
        <div className="flex flex-col">
          <p className="font-medium">Overall rating</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">5</p>
            <div className="bg-gray-300 h-1 relative w-full rounded-full">
              <div
                className={cn("h-full rounded-full bg-black")}
                style={{ width: 96 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">4</p>
            <div className="bg-gray-300 h-1 relative w-full rounded-full">
              <div
                className={cn("h-full rounded-full bg-black")}
                style={{ width: 66 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">3</p>
            <div className="bg-gray-300 h-1 relative w-full rounded-full">
              <div
                className={cn("h-full rounded-full bg-black")}
                style={{ width: 36 }}
              />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Cleanliness</p>
            <Heading title="5.0" />
          </div>
          <PiSprayBottle size={30} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Accuracy</p>
            <Heading title="4.9" />
          </div>
          <CircleCheck size={30} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Check-in</p>
            <Heading title="5.0" />
          </div>
          <Key size={30} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Communication</p>
            <Heading title="4.9" />
          </div>
          <MessageSquare size={30} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Location</p>
            <Heading title="4.9" />
          </div>
          <Map size={30} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Value</p>
            <Heading title="4.9" />
          </div>
          <Tag size={30} />
        </div>
      </div>
    </div>
  );
};
