import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  UIManager,
  Text,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Enable layout animations on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const HistoryScreen = () => {
  const [latestResult, setLatestResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const animatedValue = useRef(new Animated.Value(0)).current; // Only one value for latest result animation

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

  const toggleSection = () => {
    const isExpanded = animatedValue._value === 1;
    Animated.timing(animatedValue, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
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

  if (!latestResult) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text>No Meal History Available</Text>
      </SafeAreaView>
    );
  }

  const heightInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust based on content size
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.entryContainer}>
          <TouchableOpacity onPress={toggleSection} style={styles.header}>
            <Text style={styles.headerText}>
              {latestResult.result.name} (Tap to View)
            </Text>
          </TouchableOpacity>

          <Animated.View
            style={[styles.collapsibleContent, { height: heightInterpolation }]}
          >
            {latestResult.uri && (
              <Image
                source={{ uri: latestResult.uri }}
                style={styles.image}
                onError={() => Alert.alert("Error", "Failed to load image.")}
              />
            )}

            <View style={styles.mealContainer}>
              <Text style={styles.description}>
                {latestResult.result.description}
              </Text>
              <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionText}>
                  Calories: {latestResult.result.compound.calories}
                </Text>
                <Text style={styles.nutritionText}>
                  Proteins: {latestResult.result.compound.proteins}
                </Text>
                <Text style={styles.nutritionText}>
                  Fat: {latestResult.result.compound.fat}
                </Text>
                <Text style={styles.nutritionText}>
                  Carbs: {latestResult.result.compound.carbohydrates}
                </Text>
              </View>
              <Text style={styles.recipe}>
                Recipe: {latestResult.result.recipe}
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  entryContainer: {
    marginBottom: 16,
    width: "90%",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 12,
    backgroundColor: "#91BB45",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  collapsibleContent: {
    overflow: "hidden",
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
    fontSize: 16,
    marginBottom: 8,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  nutritionText: {
    fontSize: 14,
    color: "#666",
  },
  recipe: {
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default HistoryScreen;
