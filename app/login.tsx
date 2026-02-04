import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Button, Card, Text, Divider } from "react-native-paper";
import { router } from "expo-router";
import { Screen } from "../shared/ui/Screen";
import { getAllProfiles, setCurrentProfile } from "../features/profile/profile.storage";
import { Profile } from "../features/profile/types";

export default function LoginScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(false);
    const data = await getAllProfiles();
    setProfiles(data);
  };

  const handleSelectProfile = async (profile: Profile) => {
    await setCurrentProfile(profile);
    router.replace("/(tabs)/home");
  };

  const handleCreateNew = () => {
    router.push("/create-profile");
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {profiles.length > 0 ? "Select Profile" : "Welcome"}
        </Text>
        {profiles.length === 0 && (
          <Text variant="bodyMedium" style={styles.subtitle}>
            Create your first profile to get started
          </Text>
        )}
      </View>

      {profiles.length > 0 && (
        <View style={styles.profilesContainer}>
          <Text variant="labelLarge" style={styles.sectionLabel}>
            Your Profiles
          </Text>

          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={styles.profileCard}
                onPress={() => handleSelectProfile(item)}
              >
                <Card.Content style={styles.cardContent}>
                  {item.imageUri ? (
                    <Image
                      source={{ uri: item.imageUri }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={[styles.profileImage, styles.placeholder]}>
                      <Text variant="headlineSmall">👤</Text>
                    </View>
                  )}

                  <View style={styles.profileInfo}>
                    <Text variant="titleMedium" style={styles.profileName}>
                      {item.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.profileEmail}>
                      {item.email}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            )}
            scrollEnabled={false}
          />

          <Divider style={styles.divider} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreateNew}
          style={styles.button}
        >
          {profiles.length > 0 ? "+ New Profile" : "Create Profile"}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    opacity: 0.6,
  },
  profilesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  sectionLabel: {
    marginBottom: 12,
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  placeholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: "500",
  },
  profileEmail: {
    opacity: 0.6,
    marginTop: 4,
  },
  divider: {
    marginVertical: 20,
  },
  buttonContainer: {
    paddingVertical: 16,
  },
  button: {
    paddingVertical: 8,
  },
});
