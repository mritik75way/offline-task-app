import { View } from "react-native";
import { Text } from "react-native-paper";

export function EmptyState() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">No notes yet</Text>
      <Text>Add your first note</Text>
    </View>
  );
}
