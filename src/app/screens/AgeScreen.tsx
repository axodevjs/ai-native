import WheelPicker from "@quidone/react-native-wheel-picker";
import WheelPickerFeedback from "@quidone/react-native-wheel-picker-feedback";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegister } from "../../shared/hooks/useRegister"; // Import your hook
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout"; // Layout component

const AgeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { age, setAge } = useRegister(); // Access age and setAge from the store

  // Generate age data from 6 to 99
  const ageData = [...Array(94).keys()].map((index) => ({
    value: index + 6,
    label: (index + 6).toString(),
  }));

  // Log the selected age whenever it changes
  useEffect(() => {
    console.log(`Current age in store: ${age}`);
  }, [age]);

  return (
    <SafeAreaView>
      <QuestionLayout
        title="Сколько вам лет?"
        onBack={() => {
          console.log("Navigating back to the previous screen");
          navigation.goBack();
        }}
        onContinue={() => {
          console.log(`Proceeding with selected age: ${age}`);
          navigation.navigate("Weight" as never);
        }}
        continueText="Продолжить"
      >
        <WheelPicker
          data={ageData}
          value={age || 18} // Default to 18 if age is not set
          itemHeight={100}
          onValueChanged={({ item: { value } }) => {
            console.log(`Selected age: ${value}`);
            setAge(value); // Update age in Zustand store
          }}
          onValueChanging={() => {
            console.log("Changing age value...");
            WheelPickerFeedback.triggerSoundAndImpact(); // Optional feedback
          }}
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

export default AgeScreen;
