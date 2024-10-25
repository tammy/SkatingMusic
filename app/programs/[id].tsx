// app/programs/[id].tsx
import { useGlobalSearchParams } from "expo-router";
import { Button } from "react-native";
import { programs } from "@/src/data/programs";
import { Program } from "@/src/@types";
import { useAudioPlayer } from "@/src/hooks/useAudioPlayer";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function ProgramScreen() {
  const { id } = useGlobalSearchParams();
  const program = programs.find((p) => p.id === id) as Program | undefined;

  const { playSound } = useAudioPlayer(program?.file);

  if (!program) return <ThemedText>Program not found</ThemedText>;

  return (
    <ThemedView className="flex-1 items-center justify-center p-4 bg-white">
      <ThemedText className="text-lg text-gray-600">{program.level}</ThemedText>
      <Button title="Play Song" onPress={playSound} />
    </ThemedView>
  );
}
