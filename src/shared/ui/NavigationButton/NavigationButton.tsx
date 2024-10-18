import React from "react";
import { View } from "react-native";

interface INavigationButton {
  icon: React.ReactNode;
}

export const NavigationButton: React.FC<INavigationButton> = () => {
  return <View className="py-2 px-2"></View>;
};
