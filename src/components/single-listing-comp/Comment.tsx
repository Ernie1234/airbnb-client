import { Star } from "lucide-react";

interface IProps {
  id: string;
  user: string;
  content: string;
  date: Date;
  since: string;
  rating: number;
  imgSrc: string;
}

export const Comment: React.FC<IProps> = ({
  id,
  user,
  content,
  date,
  since,
  rating,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={`https://robohash.org/${id}?set=set3&size=50x50`}
          alt={user}
        />
        <div className="ml-2">
          <h3>{user}</h3>
          <p className="text-sm text-gray-500">{since}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < rating ? "text-slate-800 fill-accent-foreground" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="font-medium">{date.toDateString()}</p>
      </div>
      <p className="text-lg">{content}</p>
    </div>
  );
};
