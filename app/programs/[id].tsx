import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProgramScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Details of program {id} </Text>
    </View>
  );
}
