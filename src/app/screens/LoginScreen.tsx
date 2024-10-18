import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLogin } from "../../shared/hooks/useLogin";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";

export const Login = () => {
  const { t } = useTranslation();
  const { email, setEmail, password, setPassword, loading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{t("login_title")}</Text>
        <Text style={styles.subtitle}>{t("login_message")}</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder={t("email_label")}
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon name="email" size={24} color="#91BB45" />}
            containerStyle={styles.input}
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
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            containerStyle={styles.input}
          />

          <MyTouchableOpacity
            onPress={() => handleNavigation("ForgotPassword")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              {t("forgot_password")}
            </Text>
          </MyTouchableOpacity>

          <Button
            title={t("login_button")}
            onPress={login}
            loading={loading}
            buttonStyle={styles.loginButton}
            titleStyle={{ fontSize: 18 }}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{t("no_account_yet")}</Text>
            <MyTouchableOpacity
              onPress={() => handleNavigation("Registration")}
            >
              <Text style={styles.registerLink}>{t("create_account")}</Text>
            </MyTouchableOpacity>
          </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F3C33",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#2F3C33",
    width: "75%",
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    marginVertical: 12,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 12,
  },
  forgotPasswordText: {
    color: "#91BB45",
  },
  loginButton: {
    marginTop: 32,
    backgroundColor: "#91BB45",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    color: "#2F3C33",
  },
  registerLink: {
    marginLeft: 8,
    color: "#91BB45",
    fontWeight: "bold",
  },
});

export default Login;
