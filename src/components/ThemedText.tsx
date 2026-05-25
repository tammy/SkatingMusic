import { Text, type TextProps } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";

export function ThemedText({ style, ...rest }: TextProps) {
  const { colors } = useTheme();
  return <Text style={[{ color: colors.text }, style]} {...rest} />;
}
