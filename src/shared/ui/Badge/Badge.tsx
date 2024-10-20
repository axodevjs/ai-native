import React from "react";
import { Text, View } from "react-native";
import MyTouchableOpacity from "../MyTouchableOpacity/MyTouchableOpacity";

interface BadgeWithIconProps {
  children: React.ReactNode; // Accepts any React component as a child
  value: number | string;
  margin?: string;
  onPress?: () => void;
  bgColor: string; // Background color as a prop
}

export const BadgeWithIcon: React.FC<BadgeWithIconProps> = ({
  children,
  value,
  bgColor,
  onPress,
  margin,
}) => {
  return (
    <MyTouchableOpacity
      onPress={onPress}
      className={`w-[80px] h-[25px] mt-2 rounded-full items-center ${margin}`}
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex flex-row items-center h-full">
        {children}
        <Text className="ml-2 text-white text-sm">{value}</Text>
      </View>
    </MyTouchableOpacity>
  );
};
