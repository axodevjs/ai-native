// src/screens/AchievementsScreen.tsx
import React from "react";
import { View } from "react-native";
import { AchievementTab } from "../../shared/ui/AchievementTab/AchievementTab";
import { Layout } from "../../widgets/ui/layout"; // Ensure the path is correct

export const AchievementsScreen: React.FC = () => {
  return (
    <Layout isProfile>
      <View className="h-[480px]">
        <AchievementTab />
      </View>
    </Layout>
  );
};
