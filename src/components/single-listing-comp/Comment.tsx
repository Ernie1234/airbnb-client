// components/Comment.tsx
import { Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CommentDialog } from "./CommentDialog";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { IComment, UpdateCommentData } from "@/types/comment";
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  format,
} from "date-fns";

interface CommentProps {
  id: string;
  user: {
    name: string;
    imageSrc: string;
    createdAt: Date;
    id: string;
  };
  content: string;
  createdAt: Date;
  rating: number;
  onDelete: () => void;
  isDeleting?: boolean;
  updateCommentMutation: UseMutateFunction<
    IComment,
    Error,
    UpdateCommentData,
    unknown
  >;
  isUpdating?: boolean;
}

export const Comment = ({
  id,
  user,
  content,
  createdAt,
  rating,
  onDelete,
  isDeleting,
  updateCommentMutation,
  isUpdating,
}: CommentProps) => {
  const { user: currentUser } = useAuth();

  const formatMemberSince = (joinDate: Date): string => {
    const now = new Date();
    const years = differenceInYears(now, joinDate);

    if (years > 0) {
      return `${years} year${years !== 1 ? "s" : ""} on Airbnb`;
    }

    const months = differenceInMonths(now, joinDate);
    if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""} on Airbnb`;
    }

    const weeks = differenceInWeeks(now, joinDate);
    if (weeks > 0) {
      return `${weeks} week${weeks !== 1 ? "s" : ""} on Airbnb`;
    }

    const days = differenceInDays(now, joinDate);
    return `${days} day${days !== 1 ? "s" : ""} on Airbnb`;
  };

  const formatCommentDate = (date: Date): string => {
    return format(date, "MMM d, yyyy");
  };

  const memberSinceText = formatMemberSince(user.createdAt);
  const commentDateText = formatCommentDate(createdAt);

  return (
    <div className="flex flex-col gap-3 p-4 group transition-all duration-500 w-full">
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
        <span className="text-sm text-gray-500">{commentDateText}</span>
      </div>
      <p className="text-gray-700">{content}</p>
      {(user || currentUser) && user?.id === currentUser?.id && (
        <div className="transition-all duration-300 gap-2 flex">
          <CommentDialog
            mode="edit"
            onSubmit={updateCommentMutation}
            isSubmitting={!!isUpdating}
            defaultValues={{
              content,
              rating,
              commentId: id,
            }}
          >
            <Button variant="ghost" size="sm" disabled={isUpdating}>
              {isUpdating ? (
                "Editing..."
              ) : (
                <Pencil className="text-slate-600" />
              )}
            </Button>
          </CommentDialog>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : <Trash2 className="text-rose-500" />}
          </Button>
        </div>
      )}
    </div>
  );
};
