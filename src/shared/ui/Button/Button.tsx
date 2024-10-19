import { ArrowRight } from "lucide-react-native";
import React, { FC } from "react";
import MyTouchableOpacity from "../MyTouchableOpacity/MyTouchableOpacity";
import Text from "../Text/Text";

interface IButton {
  variant: "dark" | "light";
  withArrow?: boolean;
  text: string;
  onPress: () => void;
  arrowIcon?: boolean;
}

const Button: FC<IButton> = ({
  variant,
  withArrow,
  text,
  onPress,
  arrowIcon,
}) => {
  return (
    <MyTouchableOpacity
      onPress={onPress}
      className={`w-full flex-row h-[60px] rounded-[20px] flex justify-center items-center ${
        variant === "dark" ? "bg-dark" : "bg-main"
      }`}
    >
      <Text className="text-white text-base" weight="800" family="Nunito">
        {text}
      </Text>
      {
        <ArrowRight
          className="ml-4"
          strokeWidth={2}
          size={20}
          color={"white"}
        />
      }
    </MyTouchableOpacity>
  );
};

export default Button;
