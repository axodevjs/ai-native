// src/hooks/useNotifications.ts
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert } from "react-native";

export const useNotifications = () => {
  useEffect(() => {
    requestPermissions();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please enable notifications.");
    }
  };

  const scheduleNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: { seconds: 5 },
    });
  };

  return { scheduleNotification };
};
