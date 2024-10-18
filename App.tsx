import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Start from "./src/app/screens/StartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
