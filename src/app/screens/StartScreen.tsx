import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
// import LogoIcon from "@/src/shared/icons/logo-icon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import i18n from "../../shared/i18n/i18n";
import Button from "../../shared/ui/Button/Button";
import Text from "../../shared/ui/Text/Text";

const StartScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const languages = [
    { label: "Русский", value: "ru" },
    { label: "Қазақ тілі", value: "kz" },
    { label: "English", value: "en" },
  ];

  const changeLanguage = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <SafeAreaView className="bg-main h-full flex flex-col justify-between">
      <View></View>
      <View className="flex bg-white flex-col items-center pt-14 pb-1 w-full rounded-tl-[60px] rounded-tr-[60px]">
        <View className="flex flex-col items-center justify-center px-4">
          <Text
            className="text-dark text-3xl text-center"
            weight="800"
            family="Nunito"
          >
            {t("welcome")}
          </Text>
          <Text
            weight="800"
            family="Nunito"
            className="text-main rounded-2xl text-3xl mt-2"
          >
            Weight a Minute
          </Text>
        </View>
        <View className="mt-10 w-full px-4">
          <Button
            variant="light"
            text="Начать"
            onPress={() => handleNavigation("Age")}
          />
        </View>
        <View className="mt-4 gap-x-2 flex flex-row">
          <Text className="text-dark" family="Nunito">
            {t("already_have_account")}
          </Text>
          <MyTouchableOpacity onPress={() => handleNavigation("Login")}>
            <Text className="text-main" family="Nunito">
              {t("login")}
            </Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.languageContainer}>
          <View className="flex flex-row items-center mt-4">
            <Text
              family="Nunito"
              className="mr-2"
              style={[styles.languageLabel, { color: "#2F3C33" }]}
            >
              {t("language")}
            </Text>
            <Icon name="language" size={24} color="#2F3C33" />
          </View>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={changeLanguage}
              items={languages}
              value={language}
              style={{
                inputIOS: {
                  color: "#2F3C33",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderColor: "#2F3C33",
                  borderRadius: 4,
                },
                inputAndroid: {
                  color: "#2F3C33",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderColor: "#2F3C33",
                  borderRadius: 4,
                },
                placeholder: {
                  color: "#A9A9A9",
                },
              }}
              placeholder={{
                label: t("select_language"),
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

export default StartScreen;
