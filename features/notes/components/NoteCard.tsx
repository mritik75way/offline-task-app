import { StyleSheet, View } from "react-native";
import { Card, Text, Chip, useTheme } from "react-native-paper";
import { Note } from "../types";

export function NoteCard({ note }: { note: Note }) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      {note.imageUri && (
        <Card.Cover source={{ uri: note.imageUri }} style={styles.image} />
      )}

      <Card.Content style={styles.content}>
        {note.text ? (
          <Text variant="bodyMedium" numberOfLines={3} style={styles.text}>
            {note.text}
          </Text>
        ) : (
          <Text
            variant="bodyMedium"
            style={[styles.text, { fontStyle: "italic", opacity: 0.5 }]}
          >
            No text content
          </Text>
        )}

        <View style={styles.footer}>
          {note.location && (
            <Chip
              icon="map-marker"
              style={styles.locationChip}
              textStyle={styles.locationText}
              ellipsizeMode="tail"
            >
              {note.address ||
                `${note.location.lat.toFixed(2)}, ${note.location.lng.toFixed(2)}`}
            </Chip>
          )}

          <Text
            variant="labelSmall"
            style={{ marginLeft: "auto", opacity: 0.6 }}
          >
            {new Date(note.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  image: {
    height: 150,
  },
  content: {
    paddingTop: 12,
  },
  text: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
  locationChip: {
    backgroundColor: "#f0f0f0",
    flexShrink: 1,
  },
  locationText: {
    fontSize: 11,
    lineHeight: 16,
  },
});
