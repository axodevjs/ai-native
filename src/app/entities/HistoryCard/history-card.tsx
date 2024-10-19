import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";

// Enable layout animations on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const HistoryScreen = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSections, setActiveSections] = useState<number[]>([]);

  // Load meal history from AsyncStorage
  const loadMealHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("mealHistory");
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      console.log("Loaded History:", parsedHistory);
      setHistory(parsedHistory);
    } catch (error) {
      console.error("Error loading meal history:", error);
      Alert.alert("Error", "Failed to load meal history.");
    }
  };

  // Toggle section visibility with animation
  const toggleSection = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Reload data when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);
        await loadMealHistory();
        setIsLoading(false);
      };
      loadData();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#91BB45" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <View key={entry.id || index} style={styles.entryContainer}>
              <TouchableOpacity
                onPress={() => toggleSection(index)}
                style={styles.header}
              >
                <Text style={styles.headerText}>
                  {entry.result.name} (Tap to View)
                </Text>
              </TouchableOpacity>

              <Collapsible collapsed={!activeSections.includes(index)}>
                <Image
                  source={{ uri: entry.uri }}
                  style={styles.image}
                  onError={() => Alert.alert("Error", "Failed to load image.")}
                />
                <View style={styles.mealContainer}>
                  <Text style={styles.description}>
                    {entry.result.description}
                  </Text>
                  <View style={styles.nutritionContainer}>
                    <Text>Calories: {entry.result.compound.calories}</Text>
                    <Text>Proteins: {entry.result.compound.proteins}</Text>
                    <Text>Fat: {entry.result.compound.fat}</Text>
                    <Text>Carbs: {entry.result.compound.carbohydrates}</Text>
                  </View>
                  <Text style={styles.recipe}>
                    Recipe: {entry.result.recipe}
                  </Text>
                </View>
              </Collapsible>
            </View>
          ))
        ) : (
          <Text>No Meal History Available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  entryContainer: {
    marginBottom: 16,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 10,
    backgroundColor: "#91BB45",
    borderRadius: 8,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 8,
  },
  mealContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  nutritionContainer: {
    marginTop: 10,
  },
  recipe: {
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default HistoryScreen;
