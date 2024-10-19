import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { useAuthStore } from "./src/app/entities/auth/model/use-auth-store";
import { AchievementsScreen } from "./src/app/screens/AchievementsScreen";
import AgeScreen from "./src/app/screens/AgeScreen";
import { ArScreen } from "./src/app/screens/ar-screen";
import ChatScreen from "./src/app/screens/ChatScreen";
import ExerciseScreen from "./src/app/screens/ExerciseScreen";
import HeightScreen from "./src/app/screens/HeightScreen";
import HomeScreen from "./src/app/screens/HomeScreen";
import LoginScreen from "./src/app/screens/LoginScreen";
import Registration from "./src/app/screens/RegistrationScreen";
import ResetPassword from "./src/app/screens/reset-password";
import Start from "./src/app/screens/StartScreen";
import TrainingScreen from "./src/app/screens/TrainingScreen";
import WeightScreen from "./src/app/screens/WeightScreen";
import i18n from "./src/shared/i18n/i18n";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const UnauthStack = createNativeStackNavigator();

const AuthenticatedStack = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Home" component={HomeScreen} />
    <AuthStack.Screen name="Chat" component={ChatScreen} />
    <AuthStack.Screen name="Achievements" component={AchievementsScreen} />
    <AuthStack.Screen name="Ar" component={ArScreen} />
    <AuthStack.Screen name="Result" component={ResultScreen} />
    <AuthStack.Screen name="Training" component={TrainingScreen} />
    <AuthStack.Screen name="Exercise" component={ExerciseScreen} />
  </AuthStack.Navigator>
);

const UnauthenticatedStack = () => (
  <UnauthStack.Navigator screenOptions={{ headerShown: false }}>
    <UnauthStack.Screen name="Start" component={Start} />
    <AuthStack.Screen name="Age" component={AgeScreen} />
    <AuthStack.Screen name="Weight" component={WeightScreen} />
    <AuthStack.Screen name="Height" component={HeightScreen} />
    <UnauthStack.Screen name="Login" component={LoginScreen} />
    <UnauthStack.Screen name="Registration" component={Registration} />
    <UnauthStack.Screen name="Reset" component={ResetPassword} />
  </UnauthStack.Navigator>
);

export default function App() {
  const { loadToken, token, setToken, logout } = useAuthStore();
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
      await loadToken();
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
        {token ? <AuthenticatedStack /> : <UnauthenticatedStack />}
      </NavigationContainer>
    </I18nextProvider>
  );
}
