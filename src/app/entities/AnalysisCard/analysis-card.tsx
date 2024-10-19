import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import Text from "../../../shared/ui/Text/Text";
import MyTouchableOpacity from "../../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { useTextToImage } from "../../../shared/hooks/useTextToImage";

export const AnalysisCard = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { textToImage, loading: apiLoading } = useTextToImage();

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Both camera and media library access are required to scan."
        );
        return false;
      }
      return true;
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
      setImageLoading(true);

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

      if (!result.canceled && result.assets?.[0]) {
        const uri = result.assets[0].uri;
        console.log("Image URI:", uri);
        setImageUri(uri);
        await textToImage(uri);
      }
    } catch (err) {
      console.error("Error launching camera or gallery:", err);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <View className=" flex items-center justify-center mt-8">
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

        {(apiLoading || imageLoading) && (
          <ActivityIndicator
            size="large"
            color="#91BB45"
            style={styles.loader}
          />
        )}

        {!apiLoading && imageUri && (
          <Image
            source={{ uri: imageUri }}
            className="w-64 h-64 rounded-md"
            // style={styles.image}
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
              onPress={() => Alert.alert("Results", "Showing results...")}
            >
              <Text style={styles.buttonText}>Show Results</Text>
            </MyTouchableOpacity>
          ) : (
            <>
              <MyTouchableOpacity
                style={[styles.mainButton, styles.buttonMarginRight]}
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
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonMarginRight: {
    marginRight: 10,
  },
  buttonMarginLeft: {
    marginLeft: 10,
  },
});

export default AnalysisCard;
