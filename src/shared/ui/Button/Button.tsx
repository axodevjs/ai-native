import React, { FC } from "react";
import MyTouchableOpacity from "../MyTouchableOpacity/MyTouchableOpacity";
import Text from "../Text/Text";

interface IButton {
  variant: "dark" | "light";
  withArrow?: boolean;
  text: string;
  onPress: () => void;
}

const Button: FC<IButton> = ({ variant, withArrow, text, onPress }) => {
  return (
    <MyTouchableOpacity
      onPress={onPress}
      className={`w-full h-[60px] rounded-[20px] flex justify-center items-center ${
        variant === "dark" ? "bg-dark" : "bg-main"
      }`}
    >
      <Text className="text-white text-base" weight="800" family="Nunito">
        {text}
      </Text>
    </MyTouchableOpacity>
  );
};

export default Button;
