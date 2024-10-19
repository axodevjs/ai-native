import { useNavigation } from "@react-navigation/native";
import {
  Activity,
  BicepsFlexed,
  Cross,
  Dumbbell,
  Heart,
} from "lucide-react-native";
import React, { FC, ReactNode, useEffect } from "react";
import { View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWorkouts } from "../../entities/exercise/api/get-workouts.api";
import { useExerciseStore } from "../../entities/exercise/model/use-exercise-store";
import MyTouchableOpacity from "../../shared/ui/MyTouchableOpacity/MyTouchableOpacity";
import Text from "../../shared/ui/Text/Text";
import { Layout } from "../../widgets/ui/layout";

const TrainingType: FC<{
  icon: ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  const navigation = useNavigation();
  const { setExercises } = useExerciseStore();

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const { workouts } = await getWorkouts();

        // Преобразуем поле durations из строки в число
        const parsedWorkouts = workouts.map((workout) => ({
          ...workout,
          durations: parseInt(workout.durations, 10), // Преобразуем в число
        }));

        console.log("Список тренировок:", parsedWorkouts);
        setExercises(parsedWorkouts); // Сохраняем тренировки в Zustand Store
      } catch (error) {
        console.error("Не удалось загрузить тренировки", error);
      }
    };

    loadWorkouts();
  }, [setExercises]);

  return (
    <MyTouchableOpacity
      onPress={() => navigation.navigate("Exercise" as never)}
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
              Training
            </Text>
            <Text
              family="Nunito"
              weight="400"
              className="text-base leading-5 mt-2 mb-3 text-gray-400"
            >
              Choose the type of workout and our AI will select the optimal one
              for your parameters
            </Text>
            <TrainingType
              icon={<BicepsFlexed size={16} color={"white"} />}
              title="Strength Training"
              description="Build muscle and increase strength with effective resistance exercises."
            />
            <TrainingType
              icon={<Heart size={16} color={"white"} />}
              title="Cardio"
              description="Burn calories and improve endurance with aerobic workouts that keep your heart rate up."
            />
            <TrainingType
              icon={<Activity size={16} color={"white"} />}
              title="Endurance Training"
              description="Enhance your ability to sustain high-intensity exercise over longer periods."
            />
            <TrainingType
              icon={<Dumbbell size={16} color={"white"} />}
              title="Functional Training"
              description="Improve daily movements by developing strength and flexibility for everyday life."
            />
            <TrainingType
              icon={<Cross size={16} color={"white"} />}
              title="Yoga & Stretching"
              description="Calm your mind and body with exercises focused on flexibility and relaxation."
            />
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </GestureHandlerRootView>
  );
};

export default TrainingScreen;
