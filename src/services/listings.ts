import axiosInstance from "./axiosInstance";
import axios from "axios"; // Make sure to import axios

export const getAllListing = async () => {
  try {
    const response = await axiosInstance.get("/listings");
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
