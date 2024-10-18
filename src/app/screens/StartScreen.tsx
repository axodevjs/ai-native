import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity";
import { Button } from "react-native-paper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import LogoIcon from "@/src/shared/icons/logo-icon";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { useTranslation } from "react-i18next";
// import i18n from "@/src/shared/i18n/i18n";
import { useState } from "react";

export const Start = () => {
  const navigation = useNavigation();
  // const { t } = useTranslation(); // Подключаем хук useTranslation
  const [language, setLanguage] = useState("ru"); // Устанавливаем текущий язык по умолчанию

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const languages = [
    { label: "Русский", value: "ru" },
    { label: "Қазақ тілі", value: "kz" },
    { label: "English", value: "en" },
  ];

  const changeLanguage = (value: string) => {
    setLanguage(value); // Обновляем локальный стейт
    // i18n.changeLanguage(value); // Меняем язык в i18next
  };

  return (
    <SafeAreaView className="h-[100vh] bg-white ">
      <View className="items-center justify-center relative -top-20">
        <View className="w-full h-[70%] bg-main">
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "30%",
              backgroundColor: "white",
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
            }}
          />
          <View className="absolute w-full flex items-center mt-32">
            {/* <LogoIcon width={150} height={150} /> */}
          </View>
        </View>
        <View className="flex items-center justify-center -mt-12 ">
          <Text className="text-dark text-2xl font-bold">Добро Пожаловать</Text>
          <Text className="text-main text-2xl font-bold mt-1">
            Weight a Minute
          </Text>
        </View>

        <View className="mt-10">
          <Button
            mode="contained"
            style={{
              backgroundColor: "#91BB45",
              width: 240,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
            textColor="white"
            labelStyle={{ fontSize: 18 }}
            onPress={() => {
              handleNavigation("Registration");
            }}
          >
            Начать
          </Button>
        </View>

        <View className="mt-4 gap-x-1 flex flex-row">
          <Text className="text-dark">Уже есть аккаунт?</Text>
          <MyTouchableOpacity onPress={() => handleNavigation("Login")}>
            <Text className="text-main">Войти</Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.languageContainer}>
          <View className="flex flex-row items-center mt-4">
            <Text
              className="mr-1"
              style={[styles.languageLabel, { color: "#333" }]}
            >
              Язык
            </Text>
            <Icon name="language" size={24} color="#3F813D" />
          </View>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={changeLanguage}
              items={languages}
              value={language}
              style={{
                inputIOS: {
                  color: "#4D3128",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderColor: "#4D3128",
                  borderRadius: 4,
                },
                inputAndroid: {
                  color: "#4D3128",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderColor: "#4D3128",
                  borderRadius: 4,
                },
                placeholder: {
                  color: "#A9A9A9",
                },
              }}
              placeholder={{
                label: language,
                value: null,
                color: "#A9A9A9",
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  languageLabel: {
    fontSize: 16,
  },
  pickerWrapper: {
    width: "74%",
  },
});

export default Start;
