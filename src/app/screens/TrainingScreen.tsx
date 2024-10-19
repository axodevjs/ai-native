import { useNavigation } from "@react-navigation/native";
import {
  Activity,
  BicepsFlexed,
  Cross,
  Dumbbell,
  Heart,
} from "lucide-react-native";
import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExerciseStore } from "../../entities/exercise/model/use-exercise-store";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout";

const TrainingType: FC<{
  icon: ReactNode;
  title: string;
  description: string;
  workoutType: string;
}> = ({ icon, title, description, workoutType }) => {
  const navigation = useNavigation();
  const { fetchExercises } = useExerciseStore();

  const handlePress = () => {
    // Navigate to Exercise screen immediately
    navigation.navigate("Exercise" as never);
    // Fetch exercises for the selected category
    fetchExercises(workoutType);
  };

  return (
    <MyTouchableOpacity
      onPress={handlePress}
      className="w-full flex flex-col mt-4"
    >
      <View className="w-full p-5 flex flex-row justify-between items-center rounded-[30px] bg-gray-100 border-gray-200 border-[2px]">
        <View className="flex flex-col w-[80%]">
          <Text family="Nunito" weight="700" className="text-lg">
            {title}
          </Text>
          <Text
            family="Nunito"
            weight="400"
            className="text-gray-500 text-sm mt-1"
          >
            {description}
          </Text>
        </View>
        <View className="bg-main flex justify-center items-center rounded-[15px] h-[35] w-[35]">
          {icon}
        </View>
      </View>
    </MyTouchableOpacity>
  );
};

const TrainingScreen = () => {
  return (
    <GestureHandlerRootView>
      <Layout>
        <SafeAreaView className="py-5 pb-[110] flex flex-col w-full px-4">
          <ScrollView horizontal={false}>
            <Text family="Nunito" weight="800" className="text-2xl">
              Тренировка
            </Text>
            <Text
              family="Nunito"
              weight="400"
              className="text-base leading-5 mt-2 mb-3 text-gray-400"
            >
              Выберите тип тренировки, и наш ИИ подберет оптимальную для вас
              программу
            </Text>
            <TrainingType
              workoutType="Strength"
              icon={<BicepsFlexed size={16} color={"white"} />}
              title="Силовая тренировка"
              description="Набирайте мышечную массу и увеличивайте силу с помощью эффективных упражнений с отягощениями."
            />
            <TrainingType
              workoutType="Cardio"
              icon={<Heart size={16} color={"white"} />}
              title="Кардио"
              description="Сжигайте калории и улучшайте выносливость с помощью аэробных тренировок, поддерживающих высокий пульс."
            />
            <TrainingType
              workoutType="Endurance"
              icon={<Activity size={16} color={"white"} />}
              title="Тренировка на выносливость"
              description="Улучшайте способность к выполнению интенсивных упражнений на длительное время."
            />
            <TrainingType
              workoutType="Functional"
              icon={<Dumbbell size={16} color={"white"} />}
              title="Функциональная тренировка"
              description="Развивайте силу и гибкость для повседневной жизни, улучшая основные движения."
            />
            <TrainingType
              workoutType="Yoga"
              icon={<Cross size={16} color={"white"} />}
              title="Йога и растяжка"
              description="Успокойте ум и тело с помощью упражнений, направленных на гибкость и релаксацию."
            />
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </GestureHandlerRootView>
  );
};

export default TrainingScreen;
