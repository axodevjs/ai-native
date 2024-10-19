import WheelPicker from "@quidone/react-native-wheel-picker";
import WheelPickerFeedback from "@quidone/react-native-wheel-picker-feedback";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useOnboardingStore } from "../../features/onboarding/model/use-onboarding-store";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const AgeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { age, setAge } = useOnboardingStore();

  // Данные для WheelPicker, возраст от 6 до 99
  const ageData = [...Array(94).keys()].map((index) => {
    const age = index + 6;
    return {
      value: age,
      label: age.toString(),
    };
  });

  useEffect(() => {
    console.log(age);
  }, [age]);

  return (
    <QuestionLayout
      title="Сколько вам лет?"
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Weight" as never)}
      continueText="Продолжить"
    >
      <WheelPicker
        onValueChanging={() => {
          WheelPickerFeedback.triggerSoundAndImpact();
        }}
        data={ageData}
        onValueChanged={({ item: { value } }) => setAge(value)}
        value={age}
        itemHeight={90}
        itemTextStyle={{
          fontFamily: "Nunito-Bold",
          fontSize: 36,
          borderRadius: 20,
        }}
        overlayItemStyle={{
          backgroundColor: "#91BB45",
          borderRadius: 20,
        }}
        width={200}
      />
    </QuestionLayout>
  );
};

export default AgeScreen;
