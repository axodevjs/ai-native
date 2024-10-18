import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/shared/i18n/i18n";
import React from "react";
import Start from "./src/app/screens/StartScreen";
import Registration from "./src/app/screens/RegistrationScreen";
import { Login } from "./src/app/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
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
