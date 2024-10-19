import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ai-express-production-f8e8.up.railway.app/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const parsedData = data ? JSON.parse(data) : {};
      const token = parsedData?.user?.accessToken;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and retry hasn't occurred yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await AsyncStorage.getItem("userData");
        const parsedData = data ? JSON.parse(data) : {};
        const refreshToken = parsedData?.user?.refreshToken;

        if (refreshToken) {
          const res = await axios.post(
            `${axiosInstance.defaults.baseURL}/access`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          if (res.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = res.data;

            // Update tokens in AsyncStorage
            const updatedUserData = {
              ...parsedData,
              user: {
                ...parsedData.user,
                accessToken,
                refreshToken: newRefreshToken,
              },
            };
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(updatedUserData)
            );

            // Set new access token on the request and retry
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        await AsyncStorage.removeItem("userData"); // Clear storage on error
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
