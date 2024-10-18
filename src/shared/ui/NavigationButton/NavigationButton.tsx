import React from "react";
import { View } from "react-native";
import MyTouchableOpacity from "../MyTouchableOpacity/MyTouchableOpacity";

interface INavigationButton {
  icon: React.ReactNode;
  onPress: () => void;
  isActive: boolean;
}

export const NavigationButton: React.FC<INavigationButton> = ({
  icon,
  onPress,
  isActive,
}) => {
  return (
    <MyTouchableOpacity
      className={`flex items-center justify-center rounded-full py-3 px-3 ${
        isActive ? "bg-[#556C5C] shadow-lg !rounded-lg py-3 px-3" : "bg-none"
      }`}
      onPress={onPress}
    >
      {icon}
      {isActive && (
        <View className="h-1 w-[20px] bg-main rounded-full absolute bottom-0" />
      )}
    </MyTouchableOpacity>
  );
};
