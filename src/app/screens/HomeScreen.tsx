import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
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
      key={item.id}
      title={item.title}
      value={item.value}
      bgColor={item.bgColor}
      margin={index > 0 ? "ml-4" : ""}
    />
  );

  return (
    <Layout isProfile>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerText}>Health insights</Text>
        <FlatList
          data={insightsData}
          keyExtractor={(item) => item.id}
          renderItem={renderInsightCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Text style={styles.sectionHeader}>Virtual Consultant</Text>
        <View style={styles.cardsContainer}>
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
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Ensures the ScrollView takes up full screen height
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  cardsContainer: {
    gap: 6,
    marginTop: 8, // Ensures vertical spacing between cards
  },
});

export default HomeScreen;
