import { MdOutlineHolidayVillage } from "react-icons/md";
import { CiMountain1 } from "react-icons/ci";
import { PiBarn, PiFarmLight, PiPersonSimpleSki } from "react-icons/pi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import {
  GiClassicalKnowledge,
  GiIsland,
  GiMountainCave,
  GiPalmTree,
} from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import {
  BadgePlus,
  Building2,
  Castle,
  Dumbbell,
  Flame,
  House,
  LandPlot,
  Snowflake,
  TentTree,
  Waves,
  Wind,
} from "lucide-react";

export const categoriesData = [
  {
    label: "New",
    icon: BadgePlus,
    // icon: TbBeach,
    desc: "This property is new!",
  },
  {
    label: "Beach",
    icon: Waves,
    // icon: TbBeach,
    desc: "This property is close to the beach!",
  },
  {
    label: "Windmill",
    icon: Wind,
    desc: "This property has windmills!",
  },
  {
    label: "Trending",
    icon: Flame,
    desc: "This property is trending!",
  },
  {
    label: "Villa",
    icon: MdOutlineHolidayVillage,
    desc: "This property is trending!",
  },
  {
    label: "Arctic",
    icon: Snowflake,
    desc: "This property is in villa!",
  },
  {
    label: "Island",
    icon: GiIsland,
    desc: "This property is on an island!",
  },
  {
    label: "Cave",
    icon: GiMountainCave,
    desc: "This property is in a cave!",
  },
  {
    label: "Barn",
    icon: PiBarn,
    desc: "This property is in a cave!",
  },
  {
    label: "Modern",
    icon: House,
    // icon: BiBuildingHouse,
    desc: "This property is modern",
  },
  {
    label: "Cities",
    icon: Building2,
    // icon: BiBuildingHouse,
    desc: "This property is in cities!",
  },
  {
    label: "Classic",
    icon: GiClassicalKnowledge,
    // icon: BiBuildingHouse,
    desc: "This property is classic",
  },
  {
    label: "Luxury",
    icon: IoDiamondOutline,
    // icon: BiBuildingHouse,
    desc: "This property is luxurious",
  },
  {
    label: "Gym",
    icon: Dumbbell,
    desc: "This property is Gym and Fitness friendly",
  },
  {
    label: "Castle",
    icon: Castle,
    desc: "This property is in a Castles",
  },
  {
    label: "Farm",
    icon: PiFarmLight,
    desc: "This property is in a farm",
  },
  {
    label: "Tropical",
    icon: GiPalmTree,
    desc: "This property is in a tropical area",
  },
  {
    label: "Off-Grid",
    icon: HiOutlineViewGridAdd,
    desc: "This property is in a tropical area",
  },
  {
    label: "Camping",
    icon: TentTree,
    desc: "This property is in a camping area",
  },
  {
    label: "Golf",
    icon: LandPlot,
    desc: "This property has a location for golf",
  },
  {
    label: "Skiing",
    icon: PiPersonSimpleSki,
    desc: "This property has a location for golf",
  },
  {
    label: "Mountain",
    icon: CiMountain1,
    desc: "This property has a location for golf",
  },
];
