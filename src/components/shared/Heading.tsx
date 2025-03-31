import { cn } from "@/lib/utils";

interface IHeading {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const Heading = ({ title, subtitle, center, className }: IHeading) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className={cn("text-2xl font-bold", className)}>{title}</div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
