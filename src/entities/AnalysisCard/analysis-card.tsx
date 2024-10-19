import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useUserData } from "../../shared/hooks/useUserData";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";

export const AnalysisCard = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [setTextResult] = useState<string | null>(null);
  const { userData } = useUserData();
  const navigation = useNavigation();

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Both camera and media library access are required."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting permissions:", error);
      Alert.alert("Error", "Failed to request permissions.");
      return false;
    }
  };

  const convertUriToBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return {
        uri,
        name: "photo.jpg",
        type: blob.type,
      };
    } catch (error) {
      console.error("Error converting URI to Blob:", error);
      throw new Error("Failed to convert URI to Blob.");
    }
  };

  const handleImageUpload = async (uri) => {
    try {
      setImageLoading(true);

      const file = await convertUriToBlob(uri);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `https://ai-express-production-f8e8.up.railway.app/api/vision/image-to-text/${userData?.user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", response.data);
      const resultText = response.data.result?.text || response.data.result;
      setTextResult(resultText);
    } catch (error) {
    } finally {
      setImageLoading(false);
    }
  };

  const handleStartScan = async (fromGallery = false) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result;
      if (fromGallery) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets?.[0]) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await handleImageUpload(uri);
      }
    } catch (error) {}
  };

  return (
    <ScrollView className="h-[100vh] w-[90%]">
      <View className="flex items-center justify-center mt-8 w-full">
        <View className="mb-6">
          <Text className="text-4xl">Scan your meal.</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🍔</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Burger</Text>
            <Text style={styles.subtitle}>Approx. 500 Calories</Text>
          </View>

          {imageLoading && (
            <ActivityIndicator
              size="large"
              color="#91BB45"
              style={styles.loader}
            />
          )}

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              className="w-64 h-64 rounded-md"
              onError={(e) =>
                console.error("Image Load Error:", e.nativeEvent.error)
              }
              onLoad={() => setImageLoading(false)}
              onLoadStart={() => setImageLoading(true)}
            />
          )}

          <View style={styles.buttonContainer}>
            {imageUri ? (
              <MyTouchableOpacity
                style={styles.mainButton}
                onPress={() => navigation.navigate("Result" as never)}
              >
                <Text style={styles.buttonText}>Show Results</Text>
              </MyTouchableOpacity>
            ) : (
              <>
                <MyTouchableOpacity
                  style={[styles.mainButton]}
                  className="flex items-center justify-center"
                  onPress={() => handleStartScan(false)}
                >
                  <Text style={styles.buttonText}>Open Camera</Text>
                </MyTouchableOpacity>

                <MyTouchableOpacity
                  style={[styles.mainButton, styles.buttonMarginLeft]}
                  onPress={() => handleStartScan(true)}
                >
                  <Text style={styles.buttonText}>Pick from Gallery</Text>
                </MyTouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    fontSize: 50,
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
  loader: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  mainButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#91BB45",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonMarginLeft: {
    marginLeft: 10,
  },
});

export default AnalysisCard;
