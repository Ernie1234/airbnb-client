import axiosInstance from "./axiosInstance";
import axios from "axios"; // Import axios

// Update the function to accept an optional category parameter
export const getAllListing = async (category?: string) => {
  try {
    // Construct the query parameters
    const params = category ? { category } : {};
    const response = await axiosInstance.get("/listings", { params }); // Pass params as query parameters
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the error for debugging
      console.error("Error Listing:", error);
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Listing failed");
    }
  }
};

export const getListingById = async (listingId: string) => {
  try {
    const response = await axiosInstance.get(`/listings/${listingId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the error for debugging
      console.error("Error Listing:", error);
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Listing failed");
    }
  }
};
