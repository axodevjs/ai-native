// src/components/StatusTabs.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const statuses = [
  "Train",
  "Pump",
  "Relax",
  "Run",
  "Cycle",
  "Swim",
  "Lift",
  "Stretch",
  "Yoga",
];

export const StatusTabs: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const selectStatus = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 absolute bottom-0 z-10">
      <View className="p-4">
        <Text className="text-xl mb-4 text-gray-700">
          {selectedStatus
            ? `Selected: ${selectedStatus}`
            : "No Status Selected"}
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status}
            className="py-4 mb-2 bg-green-500 rounded-md"
            onPress={() => selectStatus(status)}
          >
            <Text className="text-lg text-white text-center font-bold">
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
