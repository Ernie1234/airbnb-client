import { checkSession } from "@/services/auth";

export const isUserLoggedIn = async () => {
  try {
    const data = await checkSession();

    return data.isLoggedIn; // Assuming the API returns { isLoggedIn: boolean }
  } catch (error) {
    console.error("Error checking session:", error);
    return false;
  }
};
