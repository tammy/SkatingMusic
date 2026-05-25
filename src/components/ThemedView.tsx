import { View, type ViewProps } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";

export function ThemedView({ style, ...rest }: ViewProps) {
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.background }, style]} {...rest} />;
}
