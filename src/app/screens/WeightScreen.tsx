import WheelPicker from "@quidone/react-native-wheel-picker";
import WheelPickerFeedback from "@quidone/react-native-wheel-picker-feedback";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const WeightScreen: React.FC = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState<number>(70); // Начальное значение веса, например, 70 кг

  // Данные для WheelPicker, диапазон веса от 30 до 200 кг
  const weightData = [...Array(171).keys()].map((index) => {
    const weightValue = index + 30;
    return {
      value: weightValue,
      label: weightValue.toString(),
    };
  });

  useEffect(() => {
    console.log(weight);
  }, [weight]);

  return (
    <QuestionLayout
      title="Ваш вес?"
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Height" as never)}
      continueText="Продолжить"
    >
      <WheelPicker
        onValueChanging={() => {
          WheelPickerFeedback.triggerSoundAndImpact();
        }}
        data={weightData}
        onValueChanged={({ item: { value } }) => setWeight(value)}
        value={weight}
        itemHeight={100}
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

export default WeightScreen;
