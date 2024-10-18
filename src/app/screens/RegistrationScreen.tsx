import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity";
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
    <SafeAreaView
      style={styles.container}
      className="flex items-center justify-center"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{t("create_account")}</Text>
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

        <Button
          title={loading ? t("loading") : t("create_account_button")}
          buttonStyle={styles.button}
          titleStyle={{ fontSize: 18 }}
          onPress={register}
          disabled={loading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("already_have_account")}</Text>
          <MyTouchableOpacity onPress={() => handleNavigation("Login")}>
            <Text style={styles.footerLink}>{t("login")}</Text>
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
    marginTop: 56,
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
