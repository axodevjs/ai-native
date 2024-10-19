// src/components/InsightCard.tsx
import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";

interface InsightCardProps {
  title: string;
  value: string;
  margin?: string;
  bgColor: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  margin,
  bgColor,
}) => (
  <Card
    className={`w-[170px] pr-2 flex flex-col rounded-lg ${margin}`}
    style={{ backgroundColor: bgColor }}
  >
    <Card.Content className="flex-row items-center ">
      <View className="ml-4">
        <Text className="text-white text-lg font-bold">{title}</Text>
        <Text className="text-white text-sm">{value}</Text>
      </View>
    </Card.Content>
  </Card>
);
