import axiosInstance from "./axiosInstance";
import axios from "axios"; // Import axios

// Update the function to accept an optional category parameter
export const getAllListing = async (category?: string, location?: string) => {
  try {
    // Construct the query parameters
    const params: { category?: string; location?: string } = {};
    if (category) {
      params.category = category;
    }
    if (location) {
      params.location = location;
    }
    const response = await axiosInstance.get("/listings", { params }); // Pass params as query parameters
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the error for debugging
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
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
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      throw new Error("Listing failed");
    }
  }
};

export const createListing = async (listingData: {
  title: string;
  description: string;
  price: number;
  location: string; // Only save location.value
  images: string[];
  category: string;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
}) => {
  try {
    const response = await axiosInstance.post("/listings", listingData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Listing creation failed!"
      );
    } else {
      throw new Error("Listing creation failed");
    }
  }
};
