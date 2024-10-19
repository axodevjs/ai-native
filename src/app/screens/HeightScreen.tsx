import WheelPicker from "@quidone/react-native-wheel-picker";
import WheelPickerFeedback from "@quidone/react-native-wheel-picker-feedback";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegister } from "../../shared/hooks/useRegister";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const HeightScreen: React.FC = () => {
  const navigation = useNavigation();
  const { height, setHeight } = useRegister();

  // Данные для WheelPicker, диапазон роста от 100 до 250 см
  const heightData = [...Array(151).keys()].map((index) => {
    const heightValue = index + 100;
    return {
      value: heightValue,
      label: heightValue.toString(),
    };
  });

  return (
    <SafeAreaView>
      <QuestionLayout
        title="Ваш рост?"
        onBack={() => navigation.goBack()}
        onContinue={() => navigation.navigate("Registration" as never)}
        continueText="Продолжить"
      >
        <WheelPicker
          onValueChanging={() => {
            WheelPickerFeedback.triggerSoundAndImpact();
          }}
          data={heightData}
          onValueChanged={({ item: { value } }) => setHeight(value)}
          value={height as any}
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
    </SafeAreaView>
  );
};

export default HeightScreen;
