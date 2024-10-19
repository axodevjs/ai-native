import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import { ConsultationCard } from "../../entities/ConsulationCard/ConsultationCard";
import { InsightCard } from "../../entities/InsightCard/InsightCard";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout";

const insightsData = [
  { id: "1", title: "Water Drink", value: "2 Liters", bgColor: "#0E87CC" },
  { id: "2", title: "Steps Taken", value: "1578 total", bgColor: "#F87171" },
  { id: "3", title: "Calories Burned", value: "500 kcal", bgColor: "#4ADE80" },
  { id: "4", title: "Sleep", value: "8 hours", bgColor: "#818CF8" },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderInsightCard = ({ item, index }) => (
    <InsightCard
      key={index}
      title={item.title}
      value={item.value}
      bgColor={item.bgColor}
      margin={index > 0 ? "ml-4" : ""}
    />
  );

  return (
    <Layout isProfile>
      <ScrollView className="px-4 mt-8">
        <Text className="text-2xl font-bold text-gray-700 mb-4">
          Health insights
        </Text>
        <FlatList
          data={insightsData}
          keyExtractor={(item) => item.id}
          renderItem={renderInsightCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
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
