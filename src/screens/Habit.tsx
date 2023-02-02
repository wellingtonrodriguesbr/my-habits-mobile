import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { Progressbar } from "../components/Progressbar";
import { Checkbox } from "../components/Checkbox";
import dayjs from "dayjs";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  completed: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get("/day", {
        params: { date },
      });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Falha ao buscar os hábitos.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleCompletedHabits(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="text-zinc-400 mt-6 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl lowercase">
          {dayAndMonth}
        </Text>

        <Progressbar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-40"]: isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits?.map((day) => (
              <Checkbox
                key={day.id}
                title={day.title}
                disabled={isDateInPast}
                checked={completedHabits.includes(day.id)}
                onPress={() => toggleCompletedHabits(day.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
        {isDateInPast && (
          <Text className="mt-10 text-white text-center">
            Você não pode alterar o conteúdo que já passou!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
