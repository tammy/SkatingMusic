// app/programs/[id].tsx
import { useGlobalSearchParams } from "expo-router";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { programs } from "@/src/data/programs";
import { Program } from "@/src/@types";
import { useAudioPlayer } from "@/src/hooks/useAudioPlayer";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function ProgramScreen() {
  const { id } = useGlobalSearchParams();
  const program = programs.find((p) => p.id === id) as Program | undefined;

  if (program === undefined || program.file === undefined) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4 bg-white">
        <ThemedText className="text-2xl font-bold">
          Program with id {id} not found
        </ThemedText>
      </ThemedView>
    );
  }

  const { isPlaying, isLoading, playSound, pauseSound, stopSound } =
    useAudioPlayer(program.file);

  if (!program) return <Text>Program not found</Text>;

  return (
    <ThemedView className="flex-1 items-center justify-center p-4 bg-white">
      <ThemedText className="text-2xl font-bold">{program.title}</ThemedText>
      <ThemedText className="text-lg text-gray-600">{program.level}</ThemedText>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={isPlaying ? pauseSound : playSound}
          />
          <Button title="Stop" onPress={stopSound} />
        </View>
      )}
    </ThemedView>
  );
}
