import { checkSession } from "@/services/auth";
import type { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await checkSession();
        setUser(data.user);
        setIsLoggedIn(data.user.isLoggedIn);
      } catch (error) {
        toast.error("Session expired. Please log in again.", {
          description: "Your session has expired. Please log in again.",
          position: "top-right",
        });
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isLoggedIn, isLoading, user };
};
