import { FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { programs } from "@/src/data/programs";
import { Program } from "@/src/@types";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function Index() {
  const router = useRouter();

  const renderProgramItem = ({ item }: { item: Program }) => (
    <TouchableOpacity
      onPress={() => router.push(`/programs/${item.id}`)}
      className="p-4 mb-2 bg-gray-100 rounded-lg"
    >
      <ThemedText className="text-lg font-semibold">{item.title}</ThemedText>
      <ThemedText className="text-sm text-gray-600">{item.level}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView className="flex-1 p-4 m-6">
      <FlatList
        data={programs}
        keyExtractor={(item) => item.id}
        renderItem={renderProgramItem}
      />
    </ThemedView>
  );
}
