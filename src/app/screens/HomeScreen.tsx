import React from "react";
import { Text, View } from "react-native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-white mt-24">
      <Text className="text-main mt-24">Home</Text>
      <MyTouchableOpacity onPress={() => navigation.navigate("Ar" as never)}>
        <Text className="text-main mt-24">Go to AR</Text>
      </MyTouchableOpacity>
    </View>
  );
};

export default HomeScreen;
