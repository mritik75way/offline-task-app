import { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Divider, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import { Screen } from "../../shared/ui/Screen";
import { getProfile, clearProfile, getAllProfiles, setCurrentProfile } from "../../features/profile/profile.storage";
import { Profile } from "../../features/profile/types";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const data = await getProfile();
    setProfile(data);
    const allProfiles = await getAllProfiles();
    setProfiles(allProfiles);
    setLoading(false);
  };

  const handleSwitchProfile = async (newProfile: Profile) => {
    await setCurrentProfile(newProfile);
    await loadProfile();
  };

  const handleLogout = async () => {
    await clearProfile();
    router.replace("/login");
  };

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  if (!profile) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text variant="headlineSmall">No profile found</Text>
        </View>
      </Screen>
    );
  }

  const otherProfiles = profiles.filter((p) => p.id !== profile.id);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Screen>
        <Text variant="headlineMedium" style={{ marginBottom: 24 }}>
          Profile
        </Text>

        <View style={styles.profileSection}>
          {profile.imageUri ? (
            <Image
              source={{ uri: profile.imageUri }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profileImage, styles.placeholder]}>
              <Text variant="headlineLarge">👤</Text>
            </View>
          )}

          <View style={styles.info}>
            <Text variant="headlineSmall">{profile.name}</Text>
            <Text variant="bodyMedium" style={{ opacity: 0.7, marginTop: 4 }}>
              {profile.email}
            </Text>
            <Text
              variant="labelSmall"
              style={{ opacity: 0.6, marginTop: 8 }}
            >
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Divider style={{ marginVertical: 24 }} />

        {otherProfiles.length > 0 && (
          <>
            <Text variant="titleSmall" style={{ marginBottom: 12 }}>
              Switch Profile
            </Text>

            {otherProfiles.map((p) => (
              <Button
                key={p.id}
                mode="outlined"
                onPress={() => handleSwitchProfile(p)}
                style={{ marginBottom: 8 }}
              >
                {p.name} ({p.email})
              </Button>
            ))}

            <Divider style={{ marginVertical: 16 }} />
          </>
        )}

        <Button
          mode="outlined"
          onPress={() => router.push("/create-profile")}
          style={{ marginBottom: 12 }}
        >
          Create New Profile
        </Button>

        <Button
          mode="contained"
          onPress={handleLogout}
          buttonColor="rgb(211, 47, 47)"
        >
          Logout
        </Button>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
  },
});
