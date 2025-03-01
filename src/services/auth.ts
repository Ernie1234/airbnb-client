import axios from "axios";
import axiosInstance from "./axiosInstance";

// Define the registration function
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } else {
      throw new Error("Registration failed");
    }
  }
};
