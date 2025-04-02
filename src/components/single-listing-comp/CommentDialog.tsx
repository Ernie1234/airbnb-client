import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutateFunction } from "@tanstack/react-query";

import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  CreateCommentData,
  UpdateCommentData,
  IComment,
} from "@/types/comment";
import { Button } from "@/components/ui/button";
import {
  commentSchema,
  type CommentFormValues,
} from "@/schemas/comments-schema";

interface CommentDialogProps {
  mode: "create" | "edit";
  listingId?: string; // Only required for create mode
  onSubmit: UseMutateFunction<
    IComment,
    Error,
    CreateCommentData | UpdateCommentData,
    unknown
  >;
  isSubmitting: boolean;
  defaultValues?: CommentFormValues & { commentId?: string };
}

export const CommentDialog = ({
  mode,
  listingId,
  onSubmit,
  isSubmitting,
  defaultValues,
}: CommentDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: defaultValues || {
      content: "",
      rating: 0,
    },
  });

  const ratingValue = watch("rating");

  const handleFormSubmit = (data: CommentFormValues) => {
    if (mode === "create" && listingId) {
      onSubmit({ listingId, ...data });
    } else if (mode === "edit" && defaultValues?.commentId) {
      onSubmit({ commentId: defaultValues.commentId, ...data });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        ) : (
          <Button variant="outline">Leave a Review</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Review" : "Write a Review"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= ratingValue
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setValue("rating", star)}
                />
              ))}
              <span className="text-sm text-gray-500">
                {ratingValue > 0
                  ? `${ratingValue} star${ratingValue !== 1 ? "s" : ""}`
                  : "Rate your experience"}
              </span>
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}

            <div>
              <Textarea
                placeholder="Share your experience..."
                {...register("content")}
                className="min-h-[150px]"
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
