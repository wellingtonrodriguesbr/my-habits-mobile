import { View } from "react-native";

interface ProgressbarProps {
  progress?: number;
}

export function Progressbar({ progress = 0 }: ProgressbarProps) {
  return (
    <View className="w-full h-3 rounded-full bg-zinc-700 mt-4">
      <View
        className="h-3 rounded-full bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
}
