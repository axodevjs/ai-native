// ArScreen.jsx
import React, { useState } from "react";
import { Text, View } from "react-native";
import AnalysisCard from "../../entities/AnalysisCard/analysis-card";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { Layout } from "../../widgets/ui/layout";
// If you're using TypeScript, adjust the import paths accordingly

export const ArScreen = () => {
  const [activeTab, setActiveTab] = useState("AR");

  return (
    <Layout>
      <View className="flex-row border-b border-gray-300 mt-12">
        <MyTouchableOpacity
          className={`flex-1 items-center py-4 ${
            activeTab === "AR" ? "border-b-2 border-main" : ""
          }`}
          onPress={() => setActiveTab("AR")}
        >
          <Text
            className={`text-lg ${
              activeTab === "AR" ? "text-main font-bold" : "text-gray-500"
            }`}
          >
            AR Mode
          </Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity
          className={`flex-1 items-center py-4 ${
            activeTab === "Analysis" ? "border-b-2 border-main" : ""
          }`}
          onPress={() => setActiveTab("Analysis")}
        >
          <Text
            className={`text-lg ${
              activeTab === "Analysis" ? "text-main font-bold" : "text-gray-500"
            }`}
          >
            Analysis Mode
          </Text>
        </MyTouchableOpacity>
      </View>
      <View className="flex-1 p-4">
        {activeTab === "AR" && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-dark text-xl">AR Mode Content</Text>
          </View>
        )}
        {activeTab === "Analysis" && (
          <View className="flex-1 justify-center items-center">
            <View className="items-center">
              <Text className="text-4xl">Scan you meal.</Text>
            </View>
            <AnalysisCard />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default ArScreen;
