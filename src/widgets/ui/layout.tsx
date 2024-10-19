import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useStatusStore } from "../../app/entities/StatusTab/model/useStatusStore";
import { StatusTabs } from "../../app/entities/StatusTab/StatusTab";
import { SafeAreaView, ScrollView } from "react-native";
import { BottomTab } from "../../features/ui/BottomTab";
import { ProfileCard } from "../../features/ui/ProfileCard";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";

interface ILayout {
  children: React.ReactNode;
  isProfile?: boolean;
  isBack?: boolean;
}

export const Layout: React.FC<ILayout> = ({ children, isProfile, isBack }) => {
  const navigation = useNavigation();
  const { isVisible } = useStatusStore(); // Zustand store to check visibility

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <SafeAreaView className="w-full h-[100vh] relative">
      {isBack && (
        <MyTouchableOpacity
          className="flex flex-row items-start w-[95%] ml-2"
          onPress={() => handleNavigate("Home")}
        >
          <FontAwesome name="chevron-left" size={24} color="black" />
        </MyTouchableOpacity>
      )}
      {isVisible && <StatusTabs />}
      {isProfile && <ProfileCard />}
      {children}
      <BottomTab />
    </SafeAreaView>
  );
};
