// src/screens/AchievementsScreen.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { AchievementTab } from "../../shared/ui/AchievementTab/AchievementTab";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { TaskTabs } from "../../shared/ui/Tasks/TasksTab";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout"; // Ensure the path is correct

export const AchievementsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<any>("Achievements");

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
        </View>
        {activeTab === "Tasks" ? <TaskTabs /> : <AchievementTab />}
      </View>
    </Layout>
  );
};
