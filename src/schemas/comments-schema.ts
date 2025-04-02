import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(5000, "Comment must be less than 5000 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
