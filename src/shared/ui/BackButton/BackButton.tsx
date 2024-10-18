import { ChevronLeft } from "lucide-react-native";
import React, { FC } from "react";
import MyTouchableOpacity from "../MyTouchableOpacity/MyTouchableOpacity";

const BackButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <MyTouchableOpacity
      className="w-[50] h-[50] rounded-[15px] border flex justify-center items-center border-dark"
      onPress={onPress}
    >
      <ChevronLeft strokeWidth={1} color={"#000"} size={32} />
    </MyTouchableOpacity>
  );
};

export default BackButton;
