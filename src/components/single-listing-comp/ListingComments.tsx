// components/ListingComments.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

import { Comment } from "./Comment";
import { CommentDialog } from "./CommentDialog";
import {
  getCommentsByListing,
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comments";
import type {
  ICommentApiResponse,
  CreateCommentData,
  IComment,
  UpdateCommentData,
} from "@/types/comment";

export const ListingComments = ({ listingId }: { listingId: string }) => {
  const queryClient = useQueryClient();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const { data, error, isLoading } = useQuery<ICommentApiResponse>({
    queryKey: ["comments", listingId],
    queryFn: () => getCommentsByListing(listingId),
  });

  const { mutate: createCommentMutation, isPending: isCreating } = useMutation<
    IComment,
    Error,
    CreateCommentData,
    unknown
  >({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", listingId] });
      toast.success("Comment added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateCommentMutation, isPending: isUpdating } = useMutation<
    IComment,
    Error,
    UpdateCommentData,
    unknown
  >({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", listingId] });
      setEditingCommentId(null);
      toast.success("Comment updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteCommentMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", listingId] });
      toast.success("Comment deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comment</h2>
        <CommentDialog
          mode="create"
          listingId={listingId}
          onSubmit={createCommentMutation}
          isSubmitting={isCreating}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {data?.data.comments?.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          data?.data.comments?.map((comment) => (
            <div key={comment.id} className="relative">
              <Comment
                id={comment.id}
                user={{
                  name: comment.userId.name,
                  imageSrc: comment.userId.imageSrc,
                  createdAt: new Date(comment.userId.createdAt),
                  id: comment.userId.id,
                }}
                content={comment.content}
                createdAt={new Date(comment.createdAt)}
                rating={comment.rating}
                onDelete={() => deleteCommentMutation(comment.id)}
                isDeleting={isDeleting}
                updateCommentMutation={updateCommentMutation}
                isUpdating={isUpdating && editingCommentId === comment.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
