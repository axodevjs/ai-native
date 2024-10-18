import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import Text from "../../../shared/ui/Text/Text";

export const ConsultationCard = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never); // Navigate to the selected screen
  };
  return (
    <Card className="rounded-lg">
      <Card.Content className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold">🤖Our Chatbot</Text>
          <Text className="text-gray-500">Upcoming Consultations</Text>
        </View>
        <Button
          icon="plus"
          mode="contained"
          className="bg-main"
          onPress={() => handleNavigate("Chat")}
        >
          Chat
        </Button>
      </Card.Content>
    </Card>
  );
};
