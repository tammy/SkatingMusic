import { useState, useEffect, useCallback } from "react";
import { Audio } from "expo-av";

export const useAudioPlayer = (file?: any) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Current playback time in seconds
  const [duration, setDuration] = useState(0); // Total duration of the audio in seconds

  // Configure audio mode and load the sound file
  const loadSound = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      // Set audio mode before loading sound
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true, // Ensures audio plays even when iOS is in silent mode
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(file, {
        shouldPlay: false,
      });
      setSound(sound);
      setDuration(status.durationMillis / 1000); // Set duration in seconds

      // Update progress as playback proceeds
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis / 1000); // Update progress in seconds
          setIsPlaying(status.isPlaying);
        }
      });
    } catch (error) {
      console.error("Error loading sound:", error);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  // Play the sound
  const playSound = useCallback(async () => {
    if (!sound) return;

    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
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
      setProgress(0); // Reset progress to the start
    } catch (error) {
      console.error("Error stopping sound:", error);
    }
  }, [sound]);

  // Seek to a specific position in seconds
  const seekTo = useCallback(
    async (seconds: number) => {
      if (!sound) return;

      try {
        await sound.setPositionAsync(seconds * 1000); // Convert seconds to milliseconds
        setProgress(seconds); // Update progress state
      } catch (error) {
        console.error("Error seeking sound:", error);
      }
    },
    [sound]
  );

  // Load sound on component mount
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
    seekTo,
    progress,
    duration,
  };
};
