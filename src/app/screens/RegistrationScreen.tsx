import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Text from "../../shared/ui/Text/Text";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import { useTranslation } from "react-i18next";
import { useRegister } from "../../shared/hooks/useRegister";

export const Registration = () => {
  const { t } = useTranslation();
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    register,
  } = useRegister();

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <SafeAreaView style={styles.container} className="flex items-center">
      <View style={styles.innerContainer} className="mt-24">
        <Text style={styles.title} weight="800" family="OpenSans">
          {t("create_account")}
        </Text>
        <Text style={styles.subtitle}>{t("welcome_message")}</Text>
        <View className="mt-14">
          <Input
            placeholder={t("email_label")}
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon name="email" size={24} color="#91BB45" />}
          />

          <Input
            placeholder={t("username_label")}
            value={username}
            onChangeText={setUsername}
            leftIcon={<Icon name="person" size={24} color="#91BB45" />}
          />

          <Input
            placeholder={t("password_label")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leftIcon={<Icon name="lock" size={24} color="#91BB45" />}
            rightIcon={
              <Icon
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                onPress={() => setShowPassword((prev) => !prev)}
              />
            }
          />

          <Input
            placeholder={t("confirm_password_label")}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry={!showConfirmPassword}
            leftIcon={<Icon name="lock" size={24} color="#91BB45" />}
            rightIcon={
              <Icon
                name={showConfirmPassword ? "visibility-off" : "visibility"}
                size={24}
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              />
            }
          />
        </View>
        <View className="flex items-center justify-center mt-4">
          <Button
            mode="contained"
            style={{
              backgroundColor: "#91BB45",
              width: "80%",
              height: 50,
              borderRadius: 50,
              justifyContent: "center",
            }}
            labelStyle={{ fontSize: 18, color: "white", textAlign: "center" }}
            textColor="white"
            onPress={register}
            disabled={loading}
          >
            <Text
              className="text-secondary text-lg"
              weight="400"
              family="Nunito"
            >
              {loading ? t("loading") : t("create_account_button")}
            </Text>
          </Button>
        </View>
        <View className="mt-4 gap-x-2 flex flex-row justify-center">
          <Text className="text-dark" family="Nunito">
            {t("already_have_account")}
          </Text>
          <MyTouchableOpacity onPress={() => handleNavigation("Login")}>
            <Text className="text-main" family="Nunito">
              {t("login")}
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2F3C33",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: "#2F3C33",
    width: "80%",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#91BB45",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#2F3C33",
  },
  footerLink: {
    marginLeft: 8,
    color: "#91BB45",
    fontWeight: "bold",
  },
});

export default Registration;
