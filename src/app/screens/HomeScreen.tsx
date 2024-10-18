// src/screens/HomeScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout"; // Adjust path
import { ConsultationCard } from "../entities/ConsulationCard/ConsultationCard";
import { InsightCard } from "../entities/InsightCard/InsightCard";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout isProfile>
      <ScrollView className="px-4 mt-8">
        <Text className="text-2xl font-bold text-gray-700 mb-4">
          Health Insights
        </Text>
        <View className="flex-row space-x-4">
          <InsightCard
            title="Heart Rate"
            value="97 bpm"
            icon="heart"
            bgColor="#91BB45"
          />
          <InsightCard
            title="Steps Taken"
            value="1578 total"
            icon="run"
            bgColor="#F87171"
          />
          <InsightCard
            title="Hydration"
            value="8 cups"
            icon="water"
            bgColor="#60A5FA"
          />
        </View>
        <Text className="text-xl font-semibold text-gray-700 mt-8 mb-4">
          Virtual Consultant
        </Text>
        <ConsultationCard />
      </ScrollView>
    </Layout>

  );
};

export default HomeScreen;
