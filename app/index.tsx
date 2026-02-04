import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import { getProfile } from "../features/profile/profile.storage";

export default function SplashScreen() {
  useEffect(() => {
    const run = async () => {
      const profile = await getProfile();
      router.replace(profile ? "/(tabs)/home" : "/login");
    };
    run();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
