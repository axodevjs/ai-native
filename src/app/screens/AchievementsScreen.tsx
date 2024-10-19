// src/screens/AchievementsScreen.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { AchievementTab } from "../../shared/ui/AchievementTab/AchievementTab";
import { TaskTabs } from "../../shared/ui/Tasks/TasksTab";
import { LeaderboardTab } from "../../shared/ui/LeaderboardTab/LeaderboardTab";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout"; // Ensure the path is correct

export const AchievementsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Achievements" | "Tasks" | "Leaderboard"
  >("Achievements");

  return (
    <Layout isProfile>
      <View className="flex-row border-b border-gray-300 mt-12"></View>
      <View className="h-[480px]">
        <View className="flex flex-row">
          <MyTouchableOpacity
            className={`flex-1 items-center py-4 ${
              activeTab === "Achievements" ? "border-b-2 border-main" : ""
            }`}
            onPress={() => setActiveTab("Achievements")}
          >
            <Text
              className={`text-lg ${
                activeTab === "Achievements"
                  ? "text-main font-bold"
                  : "text-gray-500"
              }`}
            >
              Achievements
            </Text>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            className={`flex-1 items-center py-4 ${
              activeTab === "Tasks" ? "border-b-2 border-main" : ""
            }`}
            onPress={() => setActiveTab("Tasks")}
          >
            <Text
              className={`text-lg ${
                activeTab === "Tasks" ? "text-main font-bold" : "text-gray-500"
              }`}
            >
              Tasks
            </Text>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            className={`flex-1 items-center py-4 ${
              activeTab === "Leaderboard" ? "border-b-2 border-main" : ""
            }`}
            onPress={() => setActiveTab("Leaderboard")}
          >
            <Text
              className={`text-lg ${
                activeTab === "Leaderboard"
                  ? "text-main font-bold"
                  : "text-gray-500"
              }`}
            >
              Leaderboard
            </Text>
          </MyTouchableOpacity>
        </View>

        {activeTab === "Tasks" && <TaskTabs />}
        {activeTab === "Achievements" && <AchievementTab />}
        {activeTab === "Leaderboard" && <LeaderboardTab />}
      </View>
    </Layout>
  );
};
