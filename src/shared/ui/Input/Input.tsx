import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

// Интерфейс для пропсов компонента Input
interface InputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => {
  return (
    <View className="w-full flex flex-col">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[{ fontFamily: "OpenSans-Regular" }, style]}
        selectionColor={"#91BB45"}
        className="h-[55px] text-black w-full px-4 rounded-[20px] border-gray-200 border-[2px] bg-gray-100"
        {...props}
      />
    </View>
  );
};

export default Input;
