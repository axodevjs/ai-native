import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/shared/i18n/i18n";
import Start from "./src/app/screens/StartScreen";
import Registration from "./src/app/screens/RegistrationScreen";
import { Login } from "./src/app/screens/LoginScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    // Шрифты Nunito
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
    // Шрифты OpenSans
    "OpenSans-BoldItalic": require("./assets/fonts/OpenSans/OpenSans-BoldItalic.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBoldItalic": require("./assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans/OpenSans-ExtraBold.ttf"),
    "OpenSans-Italic": require("./assets/fonts/OpenSans/OpenSans-Italic.ttf"),
    "OpenSans-LightItalic": require("./assets/fonts/OpenSans/OpenSans-LightItalic.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans/OpenSans-Light.ttf"),
    "OpenSans-MediumItalic": require("./assets/fonts/OpenSans/OpenSans-MediumItalic.ttf"),
    "OpenSans-Medium": require("./assets/fonts/OpenSans/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    "OpenSans-SemiBoldItalic": require("./assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
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
    <I18nextProvider i18n={i18n}>
      <NavigationContainer independent>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
