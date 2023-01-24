import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import LogoImage from "../assets/logo.svg";

export function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoImage />
      <TouchableOpacity
        onPress={() => navigate("newHabit")}
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white text-base ml-3 font-semibold">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
