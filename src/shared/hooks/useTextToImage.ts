import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { axiosInstance } from "./useInterceptor";

export const useTextToImage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const textToImage = async (imageUri: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await AsyncStorage.getItem("userData");
      console.log("Raw userData from AsyncStorage:", userData);

      const parsedUserData = userData ? JSON.parse(userData) : null;
      console.log("Parsed userData:", parsedUserData);

      if (!parsedUserData || !parsedUserData.user.id) {
        console.log("Parsed User Data:", parsedUserData.user.id);
      }

      const userId = parsedUserData.user.id;

      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      console.log("form data:", formData);

      const response = await axiosInstance.post(
        `/vision/image-to-text/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response:", response);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { textToImage, loading, error };
};
