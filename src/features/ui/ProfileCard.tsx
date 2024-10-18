import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { BadgeWithIcon } from "../../shared/ui/Badge/Badge";
import Text from "../../shared/ui/Text/Text";

interface ProfileCardProps {
  username: string;
  avatarUrl: string;
  level: number;
  isProMember: boolean;
  score: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  avatarUrl,
  level,
  isProMember,
  score,
}) => {
  return (
    <View className="w-[95%] ml-2 mt-16 p-4 bg-dark rounded-2xl">
      <View className="flex-row items-center justify-between">
        <Avatar.Image size={60} source={{ uri: avatarUrl }} />
        <View className="flex-1 ml-3">
          <Text className="text-white text-2xl font-black">
            Hello, Ruslan! 👋
          </Text>
          <View className="flex flex-row">
            <BadgeWithIcon value={255} bgColor="#91BB45" margin="mb-2">
              <FontAwesome name="star" size={14} color="white" />
            </BadgeWithIcon>
            <BadgeWithIcon value="Train" bgColor="#FFA500" margin="mb-2 ml-2">
              <FontAwesome6 name="dumbbell" size={14} color="white" />
            </BadgeWithIcon>
          </View>
        </View>
      </View>
      {/* Level display with progress bar */}
      <View className="mt-6">
        <Text className="text-white">Level: {level}</Text>
        <View className="h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
          <View
            className="h-full bg-main"
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </View>
      </View>
    </View>
  );
};
