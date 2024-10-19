// src/components/TaskTabs.tsx
import React, { useState } from "react";
import { Text, View } from "react-native";

const InProgressTab: React.FC = () => (
  <View className="flex-1 items-center justify-center">
    <Text className="text-xl font-bold">Tasks in Progress</Text>
  </View>
);

export const TaskTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("InProgress");

  const renderContent = () => {
    if (activeTab === "InProgress") {
      return <InProgressTab />;
    }
    return null;
  };

  return <View className="flex-1 bg-gray-100">{renderContent()}</View>;
};
