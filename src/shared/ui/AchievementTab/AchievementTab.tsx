// src/components/AchievementTab.tsx
import { FontAwesome6 } from "@expo/vector-icons"; // Импортируем иконки
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

// Пример данных достижений
const achievements = [
  {
    id: 1,
    value: 100,
    bgColor: "#91BB45",
    icon: "star",
    label: "Первая звезда",
  },
  { id: 2, value: 200, bgColor: "#FFA500", icon: "trophy", label: "Чемпион" },
  { id: 3, value: 300, bgColor: "#3B82F6", icon: "medal", label: "Медалист" },
  {
    id: 4,
    value: 50,
    bgColor: "#FF6347",
    icon: "fire",
    label: "Горячая серия",
  },
  {
    id: 5,
    value: 150,
    bgColor: "#FFD700",
    icon: "crown",
    label: "Король горы",
  },
  { id: 6, value: 120, bgColor: "#40E0D0", icon: "rocket", label: "Ракетчик" },
  {
    id: 7,
    value: 90,
    bgColor: "#DC143C",
    icon: "heart",
    label: "Разбиватель сердец",
  },
  { id: 8, value: 60, bgColor: "#8A2BE2", icon: "bolt", label: "Скоростной" },
  { id: 9, value: 80, bgColor: "#FF69B4", icon: "gem", label: "Коллекционер" },
  {
    id: 10,
    value: 110,
    bgColor: "#32CD32",
    icon: "leaf",
    label: "Любитель природы",
  },
];

export const AchievementTab: React.FC = () => {
  const renderAchievement = ({ item }: { item: (typeof achievements)[0] }) => (
    <View className="w-[95%] ml-2 bg-white rounded-lg p-4 mb-4 flex-row items-center">
      <Avatar.Icon
        size={48}
        icon={() => <FontAwesome6 name={item.icon} size={20} color="white" />}
        style={{ backgroundColor: item.bgColor }}
      />
      <View className="ml-4">
        <Text className="text-lg font-semibold">{item.label}</Text>
        <Text className="text-sm text-gray-500">{item.value} очков</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      className="mt-8"
      data={achievements}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderAchievement}
    />
  );
};
