import axiosInstance from "./axiosInstance";
import axios from "axios";
import type { IComment, ICommentApiResponse } from "@/types/comment";

export const getCommentsByListing = async (
  listingId: string
): Promise<ICommentApiResponse> => {
  try {
    const response = await axiosInstance.get(`/comments/listing/${listingId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch comments"
      );
    } else {
      throw new Error("Failed to fetch comments");
    }
  }
};

export const createComment = async (commentData: {
  listingId: string;
  content: string;
  rating: number;
}): Promise<IComment> => {
  try {
    const response = await axiosInstance.post("/comments", commentData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create comment"
      );
    } else {
      throw new Error("Failed to create comment");
    }
  }
};

export const updateComment = async (commentData: {
  commentId: string;
  content: string;
  rating: number;
}): Promise<IComment> => {
  try {
    const response = await axiosInstance.put(
      `/comments/${commentData.commentId}`,
      {
        content: commentData.content,
        rating: commentData.rating,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update comment"
      );
    } else {
      throw new Error("Failed to update comment");
    }
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    } else {
      throw new Error("Failed to delete comment");
    }
  }
};
