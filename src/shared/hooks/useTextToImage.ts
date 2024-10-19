import axios from "axios";
import { useState } from "react";
import { useUserData } from "./useUserData";

export const useImageToText = () => {
  const [textResult, setTextResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData(); // Assume you have access to user data

  // Updated function to accept a Blob or File object
  const imageToText = async (file: Blob | File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file); // Append the image file

      console.log(`Uploading file of type: ${file.type}, size: ${file.size}`);

      const response = await axios.post(
        `https://ai-express-production-f8e8.up.railway.app/api/vision/image-to-text/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(formData);

      setTextResult(response.data.result); // Save result from the response
    } catch (error) {
      // Handle errors, including network issues, file size problems, etc.
      console.error("Error uploading image and fetching text:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    imageToText,
    textResult,
    loading,
  };
};
