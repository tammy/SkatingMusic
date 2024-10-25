import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export const useAudioPlayer = (file?: string) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playSound = async () => {
    if (file) {
      const { sound } = await Audio.Sound.createAsync(file);
      setSound(sound);
      await sound.playAsync();
    }
  };

  return { playSound };
};
