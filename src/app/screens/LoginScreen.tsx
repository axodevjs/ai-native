import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLogin } from "../../shared/hooks/useLogin";
import { useNotifications } from "../../shared/hooks/useNotification";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";

export const Login = () => {
  const { t } = useTranslation();
  const { scheduleNotification } = useNotifications();

  const { email, setEmail, password, setPassword, loading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handlePress = () => {
    scheduleNotification("Hello!", "This is a scheduled notification.");
    Alert.alert("Notification Scheduled", "You will receive it in 5 seconds.");
  };

  return (
    <SafeAreaView style={styles.container} className="flex items-center ">
      <View style={styles.innerContainer} className="mt-24">
        <Button
          mode="contained"
          style={{
            backgroundColor: "#91BB45",
            width: "80%",
            height: 50,
            borderRadius: 50,
            marginTop: 140,
            justifyContent: "center",
          }}
          labelStyle={{ fontSize: 18, color: "white", textAlign: "center" }}
          textColor="white"
          onPress={login}
          disabled={loading}
        >
          <Text className="text-secondary text-lg" weight="400" family="Nunito">
            {loading ? t("loading") : t("login_button")}
          </Text>
        </Button>
        <Text style={styles.title}>{t("login_title")}</Text>
        <Text style={styles.subtitle}>{t("login_message")}</Text>
        <View style={styles.inputContainer} className="mt-16">
          <Input
            placeholder={t("email_label")}
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon name="email" size={24} color="#91BB45" />}
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
          />
          <MyTouchableOpacity
            onPress={() => handleNavigation("Reset")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              {t("forgot_password")}
            </Text>
          </MyTouchableOpacity>
          <Button
            mode="contained"
            style={{
              backgroundColor: "#91BB45",
              width: "80%",
              height: 50,
              borderRadius: 50,
              marginTop: 140,
              justifyContent: "center",
            }}
            labelStyle={{ fontSize: 18, color: "white", textAlign: "center" }}
            textColor="white"
            onPress={login}
            disabled={loading}
          >
            <Text
              className="text-secondary text-lg"
              weight="400"
              family="Nunito"
            >
              {loading ? t("loading") : t("login_button")}
            </Text>
          </Button>
          <View
            style={styles.registerContainer}
            className="flex flex-row items-center gap-x-2"
          >
            <Text style={styles.registerText}>{t("no_account_yet")}</Text>
            <MyTouchableOpacity
              onPress={() => handleNavigation("Registration")}
            >
              <Text className="text-main" family="Nunito">
                {t("create_account")}
              </Text>
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
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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
