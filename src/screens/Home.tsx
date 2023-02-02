import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row justify-center items-center mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className="font-bold text-zinc-400 font-xl mx-1 text-center"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary?.find((day) =>
              dayjs(date).isSame(day.date)
            );

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amountOfHabit={dayWithHabits?.amount}
                amountCompleted={dayWithHabits?.completed}
                onPress={() => navigate("habit", { date: date.toISOString() })}
              />
            );
          })}
          {amountOfSDaystoFill > 0 &&
            Array.from({ length: amountOfSDaystoFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfSDaystoFill = minimumSummaryDatesSize - datesFromYearStart.length;
