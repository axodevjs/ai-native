import React, { ReactNode } from "react";
import { View } from "react-native";
import BackButton from "../../../shared/ui/BackButton/BackButton";
import Button from "../../../shared/ui/Button/Button";
import Text from "../../../shared/ui/Text/Text";

interface QuestionLayoutProps {
  title: string;
  onBack: () => void;
  onContinue: () => void;
  continueText: string;
  children: ReactNode;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({
  title,
  onBack,
  onContinue,
  continueText,
  children,
}) => {
  return (
    <View className="flex flex-col h-full py-6 px-4 items-center justify-between">
      <View className="flex flex-col w-full items-center">
        <View className="flex w-full flex-row">
          <BackButton onPress={onBack} />
        </View>
        <Text weight="800" family="Nunito" className="text-2xl mt-5">
          {title}
        </Text>
      </View>

      <View className="flex flex-col w-full items-center">{children}</View>

      <Button onPress={onContinue} text={continueText} variant="light" />
    </View>
  );
};

export default QuestionLayout;
