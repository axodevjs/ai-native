import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import { ConsultationCard } from "../../entities/ConsulationCard/ConsultationCard";
import { InsightCard } from "../../entities/InsightCard/InsightCard";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout";

const insightsData = [
  { id: "1", title: "Выпито воды", value: "2 литра", bgColor: "#0E87CC" },
  { id: "2", title: "Пройдено шагов", value: "1578 всего", bgColor: "#F87171" },
  { id: "3", title: "Сожжено калорий", value: "500 ккал", bgColor: "#4ADE80" },
  { id: "4", title: "Сон", value: "8 часов", bgColor: "#818CF8" },
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
        <Text className="text-2xl font-bold text-gray-700 mb-4">Здоровье</Text>
        <FlatList
          data={insightsData}
          keyExtractor={(item) => item.id}
          renderItem={renderInsightCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
        <Text className="text-xl font-semibold text-gray-700 mt-8 mb-4">
          Виртуальный консультант
        </Text>
        <ConsultationCard
          name="🤖Наш Чатбот"
          paragraph="Предстоящие консультации"
          buttonText="Чат"
          screen="Chat"
        />
        <ConsultationCard
          name="🍔Анализ питания"
          paragraph="Анализируйте свою еду"
          buttonText="Начать"
          margin="mt-4"
          screen="Ar"
        />
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
