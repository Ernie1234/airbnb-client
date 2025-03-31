import axiosInstance from "./axiosInstance";
import axios from "axios"; // Import axios

export const createReservation = async (data: {
  listingId: string;
  startDate: string;
  endDate: string;
}) => {
  try {
    console.log("Creating reservation with data:", data);
    const response = await axiosInstance.post(`/reservations`, { data });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Listing:", error);
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Listing failed");
    }
  }
};
