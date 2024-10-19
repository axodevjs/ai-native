import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../shared/ui/BackButton/BackButton";
import Button from "../../../shared/ui/Button/Button";
import Text from "../../../shared/ui/Text/Text";

interface QuestionLayoutProps {
  title: string;
  onBack: () => void;
  onContinue: any;
  continueText: string;
  children: ReactNode;
  buttonDisabled?: boolean;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({
  title,
  onBack,
  onContinue,
  continueText,
  children,
  buttonDisabled,
}) => {
  return (
    <SafeAreaView className="py-6">
      <View className="flex flex-col h-full px-4 items-center justify-between">
        <View className="flex flex-col w-full items-center">
          <View className="flex w-full flex-row">
            <BackButton onPress={onBack} />
          </View>
          <Text weight="800" family="Nunito" className="text-2xl mt-5">
            {title}
          </Text>
        </View>

        <View className="flex flex-col w-full items-center pb-6">
          {children}
        </View>

        <Button
          withArrow
          disabled={buttonDisabled}
          onPress={onContinue}
          text={continueText}
          variant="light"
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestionLayout;
