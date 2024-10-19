// ArScreen.jsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnalysisCard from "../../entities/AnalysisCard/analysis-card";
import { Layout } from "../../widgets/ui/layout";
import { HistoryScreen } from "../entities/HistoryCard/history-card";

export const ArScreen = () => {
  const [activeTab, setActiveTab] = useState("Analysis");
  const navigation = useNavigation();

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
            Режим анализа
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center py-4 ${
            activeTab === "History" ? "border-b-2 border-main" : ""
          }`}
          onPress={() => setActiveTab("History")}
        >
          <Text
            className={`text-lg ${
              activeTab === "History" ? "text-main font-bold" : "text-gray-500"
            }`}
          >
            История
          </Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView className="flex-1 p-4">
        {activeTab === "Analysis" && (
          <View className="flex-1 justify-center items-center">
            <AnalysisCard />
          </View>
        )}
        {activeTab === "History" && (
          <View className="flex-1 justify-center items-center">
            <HistoryScreen />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default ArScreen;
