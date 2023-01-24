import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Habit } from "../screens/Habit";
import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";

export function AppRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="habit" component={Habit} />
      <Stack.Screen name="newHabit" component={NewHabit} />
    </Stack.Navigator>
  );
}
