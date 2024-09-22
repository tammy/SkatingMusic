import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <ProgramList></ProgramList>
    </View>
  );
}

function ProgramList() {
  return <Link href="/program/1">View first program</Link>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
