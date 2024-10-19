import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable layout animations on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const HistoryScreen = () => {
  const [latestResult, setLatestResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const loadLatestResult = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("mealHistory");
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

      if (parsedHistory.length > 0) {
        setLatestResult(parsedHistory);
      } else {
        setLatestResult([]);
        Alert.alert("No Results", "No recent results found.");
      }
    } catch (error) {
      console.error("Error loading latest result:", error);
    }
  };

  const goToNextResult = () => {
    if (currentIndex < latestResult.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousResult = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#91BB45" />
      </SafeAreaView>
    );
  }

  if (latestResult.length === 0) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text>No Meal History Available</Text>
      </SafeAreaView>
    );
  }

  const currentResult = latestResult[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.entryContainer}>
          <TouchableOpacity
            onPress={goToPreviousResult}
            disabled={currentIndex === 0}
          >
            <Text
              style={[
                styles.navigationText,
                currentIndex === 0 && styles.disabledText,
              ]}
            >
              Предыдущий рецепт
            </Text>
          </TouchableOpacity>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              {currentResult?.result.name || "No Name"}
            </Text>
            {currentResult?.uri && (
              <Image
                source={{ uri: currentResult.uri }}
                style={styles.image}
                onError={() => Alert.alert("Error", "Failed to load image.")}
              />
            )}
            <Text style={styles.description}>
              {currentResult?.result.description || "No Description"}
            </Text>
            <View style={styles.nutritionContainer}>
              <Text style={styles.nutritionText}>
                Calories: {currentResult?.result.compound.calories || 0}
              </Text>
              <Text style={styles.nutritionText}>
                Proteins: {currentResult?.result.compound.proteins || 0}
              </Text>
              <Text style={styles.nutritionText}>
                Fat: {currentResult?.result.compound.fat || 0}
              </Text>
              <Text style={styles.nutritionText}>
                Carbs: {currentResult?.result.compound.carbohydrates || 0}
              </Text>
            </View>

            <Text style={styles.recipe}>
              Recipe: {currentResult?.result.recipe || "No Recipe"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToNextResult}
            disabled={currentIndex === latestResult.length - 1}
          >
            <Text
              style={[
                styles.navigationText,
                currentIndex === latestResult.length - 1 && styles.disabledText,
              ]}
            >
              Следующий рецепт
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    height: 1000,
    alignItems: "center",
  },
  entryContainer: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  nutritionContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  nutritionText: {
    fontSize: 14,
    color: "#444",
  },
  recipe: {
    fontStyle: "italic",
    color: "#888",
    marginTop: 10,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#91BB45",
    paddingVertical: 10,
  },
  disabledText: {
    color: "#ccc",
  },
});

export default HistoryScreen;
