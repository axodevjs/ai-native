// src/components/InsightCard.tsx
import React from "react";
import { Text, View } from "react-native";
import { Avatar, Card } from "react-native-paper";

interface InsightCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  icon,
  bgColor,
}) => (
  <Card className="flex-1 rounded-lg" style={{ backgroundColor: bgColor }}>
    <Card.Content className="flex-row items-center">
      <Avatar.Icon
        size={40}
        icon={icon}
        color="white"
        style={{ backgroundColor: "transparent" }}
      />
      <View className="ml-4">
        <Text className="text-white text-lg font-bold">{title}</Text>
        <Text className="text-white text-sm">{value}</Text>
      </View>
    </Card.Content>
  </Card>
);
