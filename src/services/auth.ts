import axiosInstance from "./axiosInstance";
import axios from "axios"; // Make sure to import axios

// Define the registration function
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the error for debugging
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.message || "Registration failed!");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Registration failed");
    }
  }
};
