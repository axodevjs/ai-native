import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
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

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never); // Navigate to the selected screen
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
      {isProfile && <ProfileCard />}
      {children}
      <BottomTab />
    </SafeAreaView>
  );
};
