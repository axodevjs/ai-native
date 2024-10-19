import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useAuthStore } from "../../app/entities/auth/model/use-auth-store";
import { useStatusStore } from "../../entities/StatusTab/model/useStatusStore";
import { useUserData } from "../../shared/hooks/useUserData";
import Avatar from "../../shared/ui/Avatar/avatar";
import { BadgeWithIcon } from "../../shared/ui/Badge/Badge";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";

export const ProfileCard = () => {
  const { userData } = useUserData();
  const { logout } = useAuthStore();
  const { setStatusTabVisible, isVisible, status, icon } = useStatusStore(); // Zustand store to check visibility
  const navigation = useNavigation();

  console.log("userData:", userData);

  const handleLogout = () => {
    navigation.navigate("Login" as never);
    logout();
  };

  return (
    <View className="w-[95%] ml-2 mt-16 p-4 bg-dark rounded-2xl">
      <View className="flex-row items-center justify-between">
        <Avatar />
        <View className="flex-1 ml-3">
          <Text className="text-white text-2xl font-black">
            {/* Hello, {userData?.user.username}! 👋 */}
          </Text>
          <MyTouchableOpacity
            className="text-white text-2xl font-black"
            onPress={() => handleLogout()}
          >
            <Text className="text-white text-2xl font-black">Logout</Text>
          </MyTouchableOpacity>
          <View className="flex flex-row">
            <BadgeWithIcon value={255} bgColor="#91BB45" margin="mb-2">
              <FontAwesome name="star" size={14} color="white" />
            </BadgeWithIcon>
            <BadgeWithIcon
              value={status}
              bgColor="#FFA500"
              margin="mb-2 ml-2"
              onPress={() => setStatusTabVisible(!isVisible)}
            >
              <FontAwesome6 name={icon} size={14} color="white" />
            </BadgeWithIcon>
          </View>
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-white">Level: 1</Text>
        <View className="h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
          <View
            className="h-full bg-main"
            style={{ width: `${Math.min(5, 100)}%` }}
          />
        </View>
      </View>
    </View>
  );
};
