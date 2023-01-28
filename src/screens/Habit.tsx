import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { Progressbar } from "../components/Progressbar";
import { Checkbox } from "../components/Checkbox";
import dayjs from "dayjs";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

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

        <Progressbar progress={40} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked={false} />
          <Checkbox title="Estudar React Native" checked />
        </View>
      </ScrollView>
    </View>
  );
}
