import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "../../shared/ui/Text/Text";
import BackButton from "../../shared/ui/BackButton/BackButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export const ResultScreen = () => {
  const [latestResult, setLatestResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const loadLatestResult = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("mealHistory");
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      console.log("Loaded History:", parsedHistory);

      if (parsedHistory.length > 0) {
        setLatestResult(parsedHistory[parsedHistory.length - 1]);
      } else {
        setLatestResult(null);
        Alert.alert("No Results", "No recent results found.");
      }
    } catch (error) {
      console.error("Error loading latest result:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);
        await loadLatestResult();
        setIsLoading(false);
      };
      loadData();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#91BB45" />
        </View>
      </SafeAreaView>
    );
  }

  if (!latestResult) {
    return (
      <SafeAreaView className="flex-1">
        <View style={styles.container}>
          <Text>No Recent Results Available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row px-4">
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: latestResult.uri }}
          style={styles.image}
          onError={() => Alert.alert("Error", "Failed to load image.")}
        />
        <View style={styles.mealContainer}>
          <Text className="text-lg font-bold">{latestResult.result.name}</Text>
          <Text className="text-sm mt-2">
            {latestResult.result.description}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text>Calories: {latestResult.result.compound.calories}</Text>
            <Text>Proteins: {latestResult.result.compound.proteins}</Text>
            <Text>Fat: {latestResult.result.compound.fat}</Text>
            <Text>Carbs: {latestResult.result.compound.carbohydrates}</Text>
          </View>
          <Text className="mt-4">Recipe: {latestResult.result.recipe}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  mealContainer: {
    marginTop: 8,
    width: "90%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultScreen;
