import { FlatList, View } from "react-native";
import { Note } from "../types";
import { NoteCard } from "./NoteCard";
import { Text } from "react-native-paper";

export function NotesList({ notes }: { notes: Note[] }) {
  
  if (!notes || notes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.5 }}>
        <Text variant="bodyLarge">No notes yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NoteCard note={item} />}
      contentContainerStyle={{ paddingVertical: 16 }} 
    />
  );
}