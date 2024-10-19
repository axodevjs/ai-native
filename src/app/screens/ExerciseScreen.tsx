import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExerciseStore } from "../../entities/exercise/model/use-exercise-store";
import BackButton from "../../shared/ui/BackButton/BackButton";
import Button from "../../shared/ui/Button/Button";
import Text from "../../shared/ui/Text/Text";

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const {
    exercises,
    currentExerciseIndex,
    timeLeft,
    isRunning,
    loading,
    startExercise,
    nextExercise,
    tick,
    reset,
  } = useExerciseStore();

  const currentExercise = exercises[currentExerciseIndex];
  const isWorkoutComplete = currentExerciseIndex >= exercises.length;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && !isWorkoutComplete) {
      timer = setInterval(() => {
        tick();
        if (timeLeft <= 1) {
          nextExercise();
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft, tick, nextExercise, isWorkoutComplete]);

  return (
    <SafeAreaView className="flex h-full w-full flex-col justify-between items-center py-7 pt-3 px-4">
      <View className="w-full mb-2">
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View className="w-full flex flex-col items-center">
        {loading ? (
          <Text family="Nunito" weight="800" className="text-2xl text-center">
            Генерируется...
          </Text>
        ) : (
          <>
            <Text family="Nunito" weight="800" className="text-2xl text-center">
              {isWorkoutComplete
                ? "Поздравляем, вы завершили тренировку!"
                : currentExercise?.name || "Тренировка завершена"}
            </Text>
            <Text
              family="Nunito"
              weight="400"
              className="text-base text-gray-400 mt-2 text-center"
            >
              {isWorkoutComplete
                ? "Отличная работа! Вы выполнили все упражнения. Продолжайте в том же духе для достижения своих целей."
                : currentExercise?.description ||
                  "Поздравляем, вы завершили тренировку!"}
            </Text>
          </>
        )}
      </View>

      {!loading ? (
        <Button
          onPress={
            isWorkoutComplete
              ? () => {
                  reset();
                  navigation.goBack();
                }
              : startExercise
          }
          text={
            isWorkoutComplete
              ? "Вернуться"
              : isRunning
              ? `${timeLeft} сек осталось`
              : "Начать"
          }
          variant="light"
          disabled={isRunning && !isWorkoutComplete}
        />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default ExerciseScreen;
