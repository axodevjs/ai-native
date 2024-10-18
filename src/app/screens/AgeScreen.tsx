import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import BackButton from "../../shared/ui/BackButton/BackButton";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";
import Text from "../../shared/ui/Text/Text";

const AgeScreen = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState(18);

  return (
    <View className="flex flex-col h-full py-6 px-4 items-center justify-between">
      <View className="flex w-full flex-row">
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View className="flex flex-col w-full items-center">
        <Text weight="800" family="Nunito" className="text-2xl mb-10">
          Сколько вам лет?
        </Text>
        <Input keyboardType="numeric" />
      </View>

      <Button onPress={() => {}} text="Продолжить" variant="light" />
    </View>
  );
};

export default AgeScreen;
