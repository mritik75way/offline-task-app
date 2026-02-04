import { useState } from "react";
import { FAB } from "react-native-paper";
import { Screen } from "../../shared/ui/Screen";
import { loadNotes } from "../../features/notes/notes.service";
import { Note } from "../../features/notes/types";
import { EmptyState } from "../../features/notes/components/EmptyState";
import { NotesList } from "../../features/notes/components/NoteList";
import { router, useFocusEffect } from "expo-router";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(() => {
    loadNotes().then(setNotes);
  });

  return (
    <Screen>
      {notes.length === 0 ? <EmptyState /> : <NotesList notes={notes} />}

      <FAB
        icon="plus"
        style={{ position: "absolute", right: 16, bottom: 16 }}
        onPress={() => router.push("/create-note")}
      />
    </Screen>
  );
}
