import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { useStatusStore } from "./model/useStatusStore";

const statuses = [
  { name: "Train", color: "#34D399" },
  { name: "Pump", color: "#F87171" },
  { name: "Relax", color: "#60A5FA" },
  { name: "Run", color: "#FBBF24" },
  { name: "Cycle", color: "#A78BFA" },
  { name: "Swim", color: "#38BDF8" },
  { name: "Lift", color: "#F472B6" },
  { name: "Stretch", color: "#818CF8" },
  { name: "Yoga", color: "#4ADE80" },
];

export const StatusTabs: React.FC = () => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Access Zustand state and actions
  const { isVisible, setStatus, setStatusTabVisible } = useStatusStore();

  useEffect(() => {
    // Trigger the slide animation when the tab becomes visible
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }
  }, [isVisible]);

  const selectStatus = (status: string) => {
    setStatus(status); // Set the status in Zustand store
    setStatusTabVisible(false); // Hide the status tab after selection
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

  if (!isVisible) return null; // Don't render the tab if it's not visible

  return (
    <Animated.View
      className="w-[430px] rounded-t-3xl absolute bottom-[-45px] left-[-20px] z-10"
      style={[styles.shadow, { transform: [{ translateY: slideAnim }] }]}
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
    elevation: 8,
  },
});
