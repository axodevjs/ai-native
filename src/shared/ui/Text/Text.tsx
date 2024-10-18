import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

// Определяем типы для fontWeight и italic
type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

// Объект для сопоставления fontWeight и italic с шрифтами Nunito
const fontWeightMap: Record<string, string> = {
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
};

// Кастомный компонент Text
interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  italic?: boolean;
}

const Text: React.FC<CustomTextProps> = ({
  weight = "400",
  italic = false,
  style,
  children,
  ...props
}) => {
  // Определение правильного шрифта на основе fontWeight и italic
  const fontKey = italic ? `${weight}italic` : weight;
  const fontFamily = fontWeightMap[fontKey] || "Nunito-Regular";

  return (
    <RNText style={[styles.text, style, { fontFamily }]} {...props}>
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
