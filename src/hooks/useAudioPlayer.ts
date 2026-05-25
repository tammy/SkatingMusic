import { useEffect } from "react";
import {
  useAudioPlayer as useExpoAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";

export const useAudioPlayer = (file?: any) => {
  const player = useExpoAudioPlayer(file ?? null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  return {
    isPlaying: status.playing,
    isLoading: !status.isLoaded,
    playSound: () => player.play(),
    pauseSound: () => player.pause(),
    stopSound: () => player.stop(),
    seekTo: (seconds: number) => player.seekTo(seconds),
    progress: status.currentTime,
    duration: status.duration,
  };
};
