import { useState, useCallback } from "react";
import { FAB, Searchbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Screen } from "../../shared/ui/Screen";
import { loadNotes, searchUserNotes } from "../../features/notes/notes.service";
import { Note } from "../../features/notes/types";
import { EmptyState } from "../../features/notes/components/EmptyState";
import { NotesList } from "../../features/notes/components/NoteList";
import { router, useFocusEffect } from "expo-router";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      if (searchQuery.trim()) {
        const results = await searchUserNotes(searchQuery);
        setNotes(results);
      } else {
        const allNotes = await loadNotes();
        setNotes(allNotes);
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes]),
  );

  return (
    <Screen>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search notes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          elevation={1}
          style={styles.searchBar}
        />
      </View>

      {notes.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <NotesList notes={notes} />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/create-note")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchBar: {
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
