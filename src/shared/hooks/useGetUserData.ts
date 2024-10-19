import { useState } from "react";
import { axiosInstance } from "./useInterceptor";

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDataScore, setUserDataScore] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // To store error message

  const getUserDataScore = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/user/get-data");
      console.log("res:", response.data);

      setUserDataScore(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.message || "Failed to fetch user data.");
    } finally {
      setIsLoading(false);
    }
  };

  return { userDataScore, getUserDataScore, isLoading, error };
};
