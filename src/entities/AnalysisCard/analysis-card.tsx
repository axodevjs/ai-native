import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isResultReady, setIsResultReady] = useState<boolean>(false);
  const { userData } = useUserData();
  const navigation = useNavigation();

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Требуются разрешения",
        "Необходимо предоставить доступ к камере и медиатеке."
      );
      return false;
    }
    return true;
  };

  const saveResultToHistory = async (result: any, uri: string) => {
    try {
      const existingHistory = await AsyncStorage.getItem("mealHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const newEntry = { id: Date.now(), result, uri };

      history.push(newEntry);
      await AsyncStorage.setItem("mealHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Ошибка при сохранении результата в историю:", error);
    }
  };

  const handleImageUpload = async (uri: string) => {
    try {
      setImageLoading(true);
      setIsResultReady(false);

      const response = await fetch(uri);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("image", { uri, name: "photo.jpg", type: blob.type });

      const apiResponse = await axios.post(
        `https://ai-express-production-f8e8.up.railway.app/api/vision/image-to-text/${userData?.user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const result = apiResponse.data.result;
      await saveResultToHistory(result, uri);
      setIsResultReady(true);
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      Alert.alert("Ошибка загрузки", "Не удалось загрузить изображение.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleStartScan = async (fromGallery = false) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = fromGallery
      ? await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })
      : await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

    if (!result.canceled && result.assets?.[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await handleImageUpload(uri);
    }
  };

  return (
    <ScrollView className="h-[100vh] w-[90%]">
      <View className="flex items-center justify-center mt-8 w-full">
        <View className="mb-6">
          <Text className="text-4xl">Сканируйте вашу еду.</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🍔</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Бургер</Text>
            <Text style={styles.subtitle}>Примерно 500 Калорий</Text>
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
                console.error(
                  "Ошибка загрузки изображения:",
                  e.nativeEvent.error
                )
              }
              onLoad={() => setImageLoading(false)}
              onLoadStart={() => setImageLoading(true)}
            />
          )}

          <View style={styles.buttonContainer}>
            {imageUri ? (
              <MyTouchableOpacity
                style={[
                  styles.mainButton,
                  !isResultReady && styles.disabledButton,
                ]}
                disabled={!isResultReady}
                onPress={() => navigation.navigate("Result" as never)}
              >
                {isResultReady ? (
                  <Text style={styles.buttonText}>Показать результаты</Text>
                ) : (
                  <ActivityIndicator size="small" color="#FFF" />
                )}
              </MyTouchableOpacity>
            ) : (
              <>
                <MyTouchableOpacity
                  style={styles.mainButton}
                  className="flex items-center justify-center"
                  onPress={() => handleStartScan(false)}
                >
                  <Text style={styles.buttonText}>Открыть камеру</Text>
                </MyTouchableOpacity>

                <MyTouchableOpacity
                  style={[styles.mainButton, styles.buttonMarginLeft]}
                  onPress={() => handleStartScan(true)}
                >
                  <Text style={styles.buttonText}>Выбрать из галереи</Text>
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  mainButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#91BB45",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonMarginLeft: {
    marginLeft: 10,
  },
});

export default AnalysisCard;
