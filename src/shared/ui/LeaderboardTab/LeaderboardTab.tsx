// src/shared/ui/LeaderboardTab/LeaderboardTab.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Text from "../Text/Text";
import axios from "axios";

const BASE_URL = "https://ai-express-production-f8e8.up.railway.app/api/user";

export const LeaderboardTab: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-leaderboard`);
        setLeaderboardData(response.data.achievements);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        Alert.alert("Error", "Failed to load leaderboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getCircleColor = (index: number) => {
    switch (index) {
      case 0:
        return "#0A472E"; // First place - brightest green
      case 1:
        return "#91BB45";
      case 2:
        return "#A3C85A"; // Third place - even lighter
      default:
        return "#C8DF85";
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#91BB45" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text weight="800" family="OpenSans" style={styles.title}>
        Leaderboard
      </Text>
      <Text weight="400" family="Nunito" style={styles.subtitle}>
        Track your progress and see how you rank among the top achievers.
        Compete, improve, and climb the leaderboard to reach new milestones!
      </Text>
      {leaderboardData.map((user, index) => (
        <View
          className="p-4 shadow-2xl"
          key={user.id}
          style={[
            styles.entry,
            index === 0 ? styles.firstPlace : styles.otherPlaces,
          ]}
        >
          <View
            style={[
              styles.rankCircle,
              { backgroundColor: getCircleColor(index) },
            ]}
          >
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.points}>{user.points} XP</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#1A3E2E",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    width: "85%",
    color: "#6D6D6D",
    fontSize: 14,
    marginBottom: 16,
  },
  entry: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  firstPlace: {
    backgroundColor: "#E2F1DD",
  },
  otherPlaces: {
    backgroundColor: "#F3F3F3",
  },
  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    flex: 1,
    marginLeft: 12,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LeaderboardTab;
