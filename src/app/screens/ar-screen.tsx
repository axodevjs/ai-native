// ArScreen.jsx
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Layout } from "../../widgets/ui/layout";
import AnalysisCard from "../entities/AnalysisCard/analysis-card";
import { SafeAreaView } from "react-native-safe-area-context";
// If you're using TypeScript, adjust the import paths accordingly

export const ArScreen = () => {
  const [activeTab, setActiveTab] = useState("Analysis");

  return (
    <Layout>
      <SafeAreaView className="flex-row border-b border-gray-300">
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity
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
            Results
          </Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView className="flex-1 p-4">
        {activeTab === "Analysis" && (
          <View className="flex-1 justify-center items-center">
            <AnalysisCard />
          </View>
        )}
        {activeTab === "AR" && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-dark text-xl">Results</Text>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default ArScreen;
