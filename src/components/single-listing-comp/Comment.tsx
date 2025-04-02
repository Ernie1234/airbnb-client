import { Star } from "lucide-react";
import { Button } from "../ui/button";

interface IProps {
  id: string;
  user: {
    name: string;
    imageSrc: string;
    createdAt: Date;
  };
  content: string;
  createdAt: Date;
  rating: number;
  onDelete: () => void;
  onEdit: () => void;
  isDeleting?: boolean;
  isEditing?: boolean;
}

export const Comment: React.FC<IProps> = ({
  id,
  user,
  content,
  createdAt,
  rating,
  onDelete,
  onEdit,
  isDeleting,
  isEditing,
}) => {
  const memberSinceYears =
    new Date().getFullYear() - user.createdAt.getFullYear();
  const memberSinceText = `${memberSinceYears} year${memberSinceYears !== 1 ? "s" : ""} on Airbnb`;

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src={
            user.imageSrc || `https://robohash.org/${id}?set=set3&size=50x50`
          }
          alt={user.name}
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{memberSinceText}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {createdAt.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-gray-700">{content}</p>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isEditing}
        >
          {isEditing ? "Editing..." : "Edit"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};
