import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../shared/ui/Text/Text";
import BackButton from "../../shared/ui/BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";

export const ResultScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-row px-4">
      <View className="flex w-full flex-row">
        <BackButton onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};
