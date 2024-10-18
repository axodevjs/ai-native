import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import StartScreen from "./src/app/screens/StartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "Nunito-BlackItalic": require("./assets/fonts/Nunito/Nunito-BlackItalic.ttf"),
    "Nunito-Italic": require("./assets/fonts/Nunito/Nunito-Italic.ttf"),
    "Nunito-Black": require("./assets/fonts/Nunito/Nunito-Black.ttf"),
    "Nunito-LightItalic": require("./assets/fonts/Nunito/Nunito-LightItalic.ttf"),
    "Nunito-BoldItalic": require("./assets/fonts/Nunito/Nunito-BoldItalic.ttf"),
    "Nunito-Light": require("./assets/fonts/Nunito/Nunito-Light.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-MediumItalic": require("./assets/fonts/Nunito/Nunito-MediumItalic.ttf"),
    "Nunito-ExtraBoldItalic": require("./assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf"),
    "Nunito-Medium": require("./assets/fonts/Nunito/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("./assets/fonts/Nunito/Nunito-ExtraBold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-ExtraLightItalic": require("./assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf"),
    "Nunito-SemiBoldItalic": require("./assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf"),
    "Nunito-ExtraLight": require("./assets/fonts/Nunito/Nunito-ExtraLight.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
      setIsLoading(false);
    };

    prepareApp();
  }, [fontsLoaded]);

  if (isLoading || !fontsLoaded) {
    return null; // Optional loading screen
  }

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
