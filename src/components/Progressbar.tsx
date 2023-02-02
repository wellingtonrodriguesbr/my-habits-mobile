import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ProgressbarProps {
  progress?: number;
}

export function Progressbar({ progress = 0 }: ProgressbarProps) {
  const sharedProgress = useSharedValue(progress);
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  }, [progress]);

  return (
    <View className="w-full h-3 rounded-full bg-zinc-700 mt-4">
      <Animated.View className="h-3 rounded-full bg-violet-600" style={style} />
    </View>
  );
}
