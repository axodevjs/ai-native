import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import Text from "../../shared/ui/Text/Text";

interface IConsultationCard {
  name: string;
  paragraph: string;
  buttonText: string;
  screen: string;
  margin?: string;
}

export const ConsultationCard: React.FC<IConsultationCard> = ({
  name,
  paragraph,
  screen,
  buttonText,
  margin,
}) => {
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never); // Navigate to the selected screen
  };
  return (
    <Card className={`rounded-lg ${margin}`}>
      <Card.Content className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold">{name}</Text>
          <Text className="text-gray-500">{paragraph}</Text>
        </View>
        <Button
          icon="plus"
          mode="contained"
          className="bg-main"
          onPress={() => handleNavigate(screen)}
        >
          {buttonText}
        </Button>
      </Card.Content>
    </Card>
  );
};
