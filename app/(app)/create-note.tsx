import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, View, StyleSheet, Alert } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text, Chip, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { Screen } from "../../shared/ui/Screen";
import { createNote } from "../../features/notes/notes.service";
import * as Location from "expo-location";
import { NoteLocation } from "../../features/notes/types";

export default function CreateNote() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [location, setLocation] = useState<NoteLocation | undefined>();
  const [locLoading, setLocLoading] = useState(false);
  const [address, setAddress] = useState("");

  const addLocation = async () => {
    setLocLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const pos = await Location.getCurrentPositionAsync({});
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      const [place] = await Location.reverseGeocodeAsync({
        latitude: coords.lat,
        longitude: coords.lng,
      });

      if (place) {
        const city = place.city || place.district;
        const region = place.region;
        const displayAddress =
          city && region ? `${city}, ${region}` : place.name;

        setLocation(coords);
        setAddress(displayAddress as string);
      }
    } catch (e) {
      setError("Failed to fetch location name");
    } finally {
      setLocLoading(false);
    }
  };

  const removeLocation = () => {
    setLocation(undefined);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "We need access to your photos to attach images.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(undefined);
  };

  const onSave = async () => {
    if (!text.trim() && !imageUri) {
      setError("Please add some text or an image.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createNote({
        text,
        imageUri,
        location,
        address,
      });

      router.back();
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Screen>
        <Text variant="headlineMedium" style={styles.title}>
          New Note
        </Text>

        <TextInput
          mode="outlined"
          label="Write your note"
          placeholder="What's on your mind?"
          multiline
          value={text}
          onChangeText={setText}
          style={styles.input}
          error={!!error}
        />

        <View style={styles.actionRow}>
          {!imageUri && (
            <Button icon="camera" mode="text" onPress={pickImage}>
              Add Image
            </Button>
          )}
          {!location && (
            <Button
              icon="map-marker"
              mode="text"
              onPress={addLocation}
              loading={locLoading}
            >
              Add Location
            </Button>
          )}
        </View>

        {imageUri && (
          <View style={styles.mediaContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.imageControls}>
              <Button icon="camera-retake" onPress={pickImage} compact>
                Change
              </Button>
              <Button
                icon="delete"
                onPress={removeImage}
                textColor="red"
                compact
              >
                Remove
              </Button>
            </View>
          </View>
        )}

        {location && (
          <View style={styles.chipContainer}>
            <Chip
              icon="map-marker"
              onClose={removeLocation}
              style={styles.chip}
            >
              Location Attached
            </Chip>
          </View>
        )}

        {locLoading && !location && (
          <Text style={styles.loadingText}>Fetching location...</Text>
        )}

        {error ? (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        ) : null}

        <Button
          mode="contained"
          loading={loading}
          onPress={onSave}
          style={styles.saveButton}
          disabled={loading || locLoading}
        >
          Save Note
        </Button>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 16 },
  input: { marginBottom: 8, minHeight: 120, backgroundColor: "transparent" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  mediaContainer: {
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 8,
  },
  image: { width: "100%", height: 200, borderRadius: 8 },
  imageControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  chipContainer: { flexDirection: "row", marginBottom: 16 },
  chip: { backgroundColor: "#e0e0e0" },
  loadingText: { fontSize: 12, color: "gray", marginTop: 8 },
  saveButton: { marginTop: "auto", marginBottom: 16 },
});