import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTextToImage } from "../../shared/hooks/useTextToImage";

export const AnalysisCard = () => {
  const [imageUri, setImageUri] = useState(null);
  const { textToImage, loading, error } = useTextToImage();

  const requestPermissions = async () => {
    try {
      // Request camera permission
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      console.log("Camera Permission Status:", cameraStatus);

      // Request media library permission
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Media Library Permission Status:", mediaLibraryStatus);

      // Check if both permissions are granted
      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Both camera and media library access are required to scan."
        );
        return false;
      }
      return true; // Permissions granted
    } catch (error) {
      console.error("Error requesting permissions:", error);
      Alert.alert("Error", "Failed to request permissions. Try again.");
      return false;
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

      console.log("Image Picker Result:", result);

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        await textToImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error launching camera or gallery:", err);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <View className="w-4/5 mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <View className="flex-row items-center justify-center mt-2">
        <Text className="text-5xl">🍔</Text>
      </View>

      <View className="items-center mb-6">
        <Text className="text-2xl font-bold text-dark">Burger</Text>
        <Text className="text-lg text-gray-500">Approx. 500 Calories</Text>
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-48 rounded-md mt-4"
        />
      )}

      {loading && (
        <ActivityIndicator size="large" color="#91BB45" className="mt-4" />
      )}

      {error && <Text className="text-red-500 text-center mt-2">{error}</Text>}

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-main flex-1 py-3 mr-2 rounded-md"
          onPress={() => handleStartScan(false)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Open Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-main flex-1 py-3 ml-2 rounded-md"
          onPress={() => handleStartScan(true)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Pick from Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnalysisCard;
