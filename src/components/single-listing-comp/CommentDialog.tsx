// components/CommentDialog.tsx
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
import { useState } from "react";

type CommentDialogBaseProps = {
  isSubmitting: boolean;
  children?: React.ReactNode;
};

type CreateDialogProps = CommentDialogBaseProps & {
  mode: "create";
  listingId: string;
  onSubmit: UseMutateFunction<IComment, Error, CreateCommentData, unknown>;
};

type EditDialogProps = CommentDialogBaseProps & {
  mode: "edit";
  onSubmit: UseMutateFunction<IComment, Error, UpdateCommentData, unknown>;
  defaultValues: CommentFormValues & { commentId: string };
};

type CommentDialogProps = CreateDialogProps | EditDialogProps;

export const CommentDialog = (props: CommentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues:
      props.mode === "edit"
        ? props.defaultValues
        : {
            content: "",
            rating: 0,
          },
  });

  const ratingValue = watch("rating");

  const handleFormSubmit = (data: CommentFormValues) => {
    if (props.mode === "create") {
      props.onSubmit({ listingId: props.listingId, ...data });
    } else {
      props.onSubmit({ commentId: props.defaultValues.commentId, ...data });
    }
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {props.children || (
          <Button variant="primary">
            {props.mode === "edit" ? "Edit" : "Leave a Comment"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.mode === "edit" ? "Edit Comment" : "Write a Comment"}
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
              <Button
                type="submit"
                variant="primary"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
