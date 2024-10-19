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
          Health insights
        </Text>
        <View className="flex-row space-x-2">
          <InsightCard title="Water Drink" value="2 Liters" bgColor="#0E87CC" />
          <InsightCard
            margin="ml-4"
            title="Steps Taken"
            value="1578 total"
            bgColor="#F87171"
          />
        </View>
        <Text className="text-xl font-semibold text-gray-700 mt-8 mb-4">
          Virtual Consultant
        </Text>
        <ConsultationCard
          name="🤖Our Chatbot"
          paragraph="Upcoming Consultations"
          buttonText="Chat"
          screen="Chat"
        />
        <ConsultationCard
          name="🍔Food Analysis"
          paragraph="Analyze your meal"
          buttonText="Start"
          margin="mt-4"
          screen="Ar"
        />
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
