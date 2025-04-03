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
      throw new Error(error.response?.data?.message || "Registration failed!");
    } else {
      throw new Error("Registration failed");
    }
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed!");
    } else {
      throw new Error("Login failed");
    }
  }
};

export const checkSession = async () => {
  try {
    const response = await axiosInstance.get("/auth/check-session");
    return response.data;
  } catch (error) {
    throw new Error("Failed to check session");
  }
};
