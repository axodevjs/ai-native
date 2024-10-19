import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface LogoutHookResult {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

export const useLogout = (): LogoutHookResult => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigation = useNavigation();

  const logout = async () => {
    try {
      setIsLoggingOut(true); // Indicate the process is ongoing
      await AsyncStorage.removeItem("userData"); // Remove the user data
      console.log("User data removed from AsyncStorage");

      // Optionally navigate to the login or home screen after logout
      navigation.navigate("Login" as never);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false); // End the logout process
    }
  };

  return { logout, isLoggingOut };
};
