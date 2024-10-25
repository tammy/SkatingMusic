import { useState, useEffect, useCallback } from "react";
import { Audio } from "expo-av";
import { Alert } from "react-native";

export const useAudioPlayer = (file?: any) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadSound = useCallback(async () => {
    if (!file) {
      console.log("No audio file provided");
      return;
    }

    setIsLoading(true);
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true, // Ensures audio plays even when iOS is in silent mode
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      console.log("Trying to load file");
      const { sound } = await Audio.Sound.createAsync(file, {
        shouldPlay: false,
      });
      console.log("Sound loaded successfully");
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
      Alert.alert("Error", `Error loading sound: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  // Play the sound
  const playSound = useCallback(async () => {
    if (!sound) return;

    setIsLoading(true); // Set loading while attempting to play
    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [sound]);

  // Pause the sound
  const pauseSound = useCallback(async () => {
    if (!sound) return;

    try {
      await sound.pauseAsync();
      setIsPlaying(false);
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  }, [sound]);

  // Stop the sound and reset position
  const stopSound = useCallback(async () => {
    if (!sound) return;

    try {
      await sound.stopAsync();
      setIsPlaying(false);
    } catch (error) {
      console.error("Error stopping sound:", error);
    }
  }, [sound]);

  // Cleanup to unload the sound when component unmounts
  useEffect(() => {
    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, [file]);

  return {
    isPlaying,
    isLoading,
    playSound,
    pauseSound,
    stopSound,
  };
};
