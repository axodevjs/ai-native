import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { usePageStore } from "../../app/model/usePageStore";
import { NavigationButton } from "../../shared/ui/NavigationButton/NavigationButton";

export const BottomTab = () => {
  const navigation = useNavigation();
  const { activePage, setActivePage } = usePageStore(); // Use the Zustand store

  const handleNavigate = (page: string, screen: string) => {
    setActivePage(page); // Update the active page state
    navigation.navigate(screen as never); // Navigate to the selected screen
  };

  return (
    <View className="w-[95%] ml-2 absolute bottom-12 flex flex-row justify-around items-center bg-dark py-4 px-4 rounded-3xl shadow-2xl">
      <NavigationButton
        icon={
          <FontAwesome6
            name="house-user"
            size={24}
            color={activePage === "home" ? "#91BB45" : "white"}
          />
        }
        onPress={() => handleNavigate("home", "Home")}
        isActive={activePage === "home"}
      />
      <NavigationButton
        icon={
          <FontAwesome6
            name="dumbbell"
            size={24}
            color={activePage === "training" ? "#91BB45" : "white"}
          />
        }
        onPress={() => handleNavigate("training", "Training")}
        isActive={activePage === "training"}
      />
      <NavigationButton
        icon={
          <FontAwesome6
            name="bowl-food"
            size={24}
            color={activePage === "food" ? "#91BB45" : "white"}
          />
        }
        onPress={() => handleNavigate("food", "Ar")}
        isActive={activePage === "food"}
      />
      <NavigationButton
        icon={
          <FontAwesome6
            name="trophy"
            size={24}
            color={activePage === "achievements" ? "#91BB45" : "white"}
          />
        }
        onPress={() => handleNavigate("achievements", "Achievements")}
        isActive={activePage === "achievements"}
      />
    </View>
  );
};
