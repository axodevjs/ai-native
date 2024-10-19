import { Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../Text/Text";

// Интерфейс для пропсов компонента Input
interface InputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  classNameContainer?: string;
  label?: string;
  type?: "text" | "email" | "password";
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  label,
  type = "text",
  classNameContainer,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log("isPasswordVisible", isPasswordVisible);
    console.log('type === "password"', type === "password");
    console.log("!isPasswordVisible", !isPasswordVisible);
    console.log("!isPasswordVisible", !isPasswordVisible);
  }, [isPasswordVisible]);

  return (
    <View
      className={`w-full flex flex-col ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      {label ? (
        <Text
          className="text-sm text-gray-500 mb-2"
          family="OpenSans"
          weight="600"
        >
          {label}
        </Text>
      ) : null}

      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={type === "password" && !isPasswordVisible}
          style={[{ fontFamily: "OpenSans-Regular" }, style]}
          selectionColor={"#91BB45"}
          className="h-[55px] text-black w-full px-4 rounded-[20px] border-gray-200 border-[2px] bg-gray-100"
          {...props}
        />

        {/* Кнопка для показа/скрытия пароля */}
        {type === "password" && (
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 15 }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Eye size={24} color={"#c3c3c3"} />
            ) : (
              <EyeOff size={24} color={"#c3c3c3"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
