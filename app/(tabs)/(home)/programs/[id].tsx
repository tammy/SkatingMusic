import { View, Text, StyleSheet } from "react-native";

export default function ProgramScreen() {
  return (
    <View style={styles.container}>
      <Text>Program</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
