import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";

// Statuses with assigned background colors
const statuses = [
  { name: "Train", color: "#34D399" }, // Green
  { name: "Pump", color: "#F87171" }, // Red
  { name: "Relax", color: "#60A5FA" }, // Blue
  { name: "Run", color: "#FBBF24" }, // Yellow
  { name: "Cycle", color: "#A78BFA" }, // Purple
  { name: "Swim", color: "#38BDF8" }, // Light Blue
  { name: "Lift", color: "#F472B6" }, // Pink
  { name: "Stretch", color: "#818CF8" }, // Indigo
  { name: "Yoga", color: "#4ADE80" }, // Lime
];

export const StatusTabs: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial position off-screen

  useEffect(() => {
    // Trigger the animation when the component mounts
    Animated.timing(slideAnim, {
      toValue: 0, // Slide up to the visible position
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp), // Use Easing for smooth animation
    }).start();
  }, []);

  const selectStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const renderItem = ({ item }: { item: { name: string; color: string } }) => (
    <MyTouchableOpacity
      key={item.name}
      className="w-[90%] m-auto py-4 mb-2 rounded-full"
      style={{ backgroundColor: item.color }}
      onPress={() => selectStatus(item.name)}
    >
      <Text className="text-lg text-white text-center font-bold">
        {item.name}
      </Text>
    </MyTouchableOpacity>
  );

  return (
    <Animated.View
      className="w-[430px] rounded-t-3xl absolute bottom-[-45px] left-[-20px] z-10"
      style={[
        styles.shadow,
        { transform: [{ translateY: slideAnim }] }, // Apply sliding animation
      ]}
    >
      <View className="h-[250px] bg-white rounded-2xl p-4 w-[90%] mx-auto">
        <FlatList
          data={statuses}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
});
