import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

// Объект для сопоставления стилей шрифтов OpenSans и Nunito
const fontMap: Record<string, Record<string, string>> = {
  Nunito: {
    "100": "Nunito-ExtraLight",
    "200": "Nunito-ExtraLight",
    "300": "Nunito-Light",
    "400": "Nunito-Regular",
    "500": "Nunito-Medium",
    "600": "Nunito-SemiBold",
    "700": "Nunito-Bold",
    "800": "Nunito-ExtraBold",
    "900": "Nunito-Black",
    "100italic": "Nunito-ExtraLightItalic",
    "200italic": "Nunito-ExtraLightItalic",
    "300italic": "Nunito-LightItalic",
    "400italic": "Nunito-Italic",
    "500italic": "Nunito-MediumItalic",
    "600italic": "Nunito-SemiBoldItalic",
    "700italic": "Nunito-BoldItalic",
    "800italic": "Nunito-ExtraBoldItalic",
    "900italic": "Nunito-BlackItalic",
  },
  OpenSans: {
    "100": "OpenSans-Light",
    "200": "OpenSans-Light",
    "300": "OpenSans-Light",
    "400": "OpenSans-Regular",
    "500": "OpenSans-Medium",
    "600": "OpenSans-SemiBold",
    "700": "OpenSans-Bold",
    "800": "OpenSans-ExtraBold",
    "900": "OpenSans-ExtraBold",
    "100italic": "OpenSans-LightItalic",
    "200italic": "OpenSans-LightItalic",
    "300italic": "OpenSans-LightItalic",
    "400italic": "OpenSans-Italic",
    "500italic": "OpenSans-MediumItalic",
    "600italic": "OpenSans-SemiBoldItalic",
    "700italic": "OpenSans-BoldItalic",
    "800italic": "OpenSans-ExtraBoldItalic",
    "900italic": "OpenSans-ExtraBoldItalic",
  },
};

// Кастомный компонент Text
interface CustomTextProps extends TextProps {
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  italic?: boolean;
  family?: "OpenSans" | "Nunito";
}

const Text: React.FC<CustomTextProps> = ({
  weight = "400",
  italic = false,
  family = "Nunito",
  style,
  children,
  ...props
}) => {
  // Определение правильного шрифта на основе weight, italic и family
  const fontKey = `${weight}${italic ? "italic" : ""}`;
  const selectedFontFamily =
    fontMap[family]?.[fontKey] || fontMap["Nunito"]["400"];

  return (
    <RNText
      style={[styles.text, style, { fontFamily: selectedFontFamily }]}
      {...props}
    >
      {children}
    </RNText>
  );
};

// Стили по умолчанию
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#000",
  },
});

export default Text;
