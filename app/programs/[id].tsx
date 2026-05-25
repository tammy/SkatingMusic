import { ActivityIndicator, Image } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { programs } from "../../src/data/programs";
import { useAudioPlayer } from "../../src/hooks/useAudioPlayer";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function ProgramScreen() {
  const { id } = useLocalSearchParams();
  const program = programs.find((p) => p.id === id);

  const {
    isPlaying,
    isLoading,
    playSound,
    pauseSound,
    seekTo,
    progress,
    duration,
  } = useAudioPlayer(program?.file);

  if (!program) return <ThemedText>Program not found</ThemedText>;

  return (
    <ThemedView className="flex-1 items-center justify-center p-4">
      <Stack.Screen options={{ title: program.title }} />

      <Image
        source={require("../../assets/images/placeholder-album.png")}
        style={{ width: 300, height: 300, borderRadius: 10, marginBottom: 20 }}
      />

      <ThemedText className="text-2xl font-bold mb-1">
        {program.title}
      </ThemedText>
      {program.artist && (
        <ThemedText className="text-lg text-gray-600 mb-6">
          {program.artist}
        </ThemedText>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#1EB1FC" />
      ) : (
        <ThemedView className="w-3/4 items-center">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={progress}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1EB1FC"
            onSlidingComplete={seekTo}
          />
          <ThemedView className="flex-row justify-between w-full">
            <ThemedText>{formatTime(progress)}</ThemedText>
            <ThemedText>{formatTime(duration)}</ThemedText>
          </ThemedView>

          <ThemedView className="flex-row items-center justify-center mt-6 space-x-14">
            <FontAwesome.Button
              name={isPlaying ? "pause" : "play"}
              backgroundColor="transparent"
              color="#1EB1FC"
              size={50}
              onPress={isPlaying ? pauseSound : playSound}
            />
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
