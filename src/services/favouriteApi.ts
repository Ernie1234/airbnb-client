import axiosInstance from "./axiosInstance";
import axios from "axios";

export interface AddFavouriteResponse {
  success: boolean;
  message: string;
  data: string[];
}

export const addFavourite = async (
  listingId: string
): Promise<AddFavouriteResponse> => {
  try {
    const response = await axiosInstance.post(`/favourites/${listingId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error adding favourite:", error);
      throw new Error(
        error.response?.data?.message || "Failed to add favourite!"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to add favourite");
    }
  }
};

export const removeFavourite = async (
  listingId: string
): Promise<AddFavouriteResponse> => {
  try {
    const response = await axiosInstance.delete(`/favourites/${listingId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error removing favourite:", error);
      throw new Error(
        error.response?.data?.message || "Failed to remove favourite!"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to remove favourite");
    }
  }
};

export interface Favourite {
  _id: string;
  // Add other properties as needed
}

export interface GetFavouritesResponse {
  success: boolean;
  message: string;
  data: Favourite[];
}

export const getFavourites = async (): Promise<GetFavouritesResponse> => {
  try {
    const response = await axiosInstance.get(`/favourites`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching favourites:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch favourites!"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to fetch favourites");
    }
  }
};
