import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home</Text>
      <Link
        href={{
          pathname: "/programs/[id]",
          params: { id: "bacon" },
        }}
      >
        View first program
      </Link>
      <Link href="/settings">Settings</Link>
    </View>
  );
}
