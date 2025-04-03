import axiosInstance from "./axiosInstance";
import axios from "axios"; // Import axios

export const createReservation = async (data: {
  listingId: string;
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await axiosInstance.post(`/reservations`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      throw new Error("Listing failed");
    }
  }
};

export const getReservations = async () => {
  try {
    const response = await axiosInstance.get("/reservations");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Listing failed!");
    } else {
      throw new Error("Listing failed");
    }
  }
};

export const deleteReservation = async (reservationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/reservations/${reservationId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete reservation."
      );
    } else {
      throw new Error("Failed to delete reservation.");
    }
  }
};
