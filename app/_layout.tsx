import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { paperTheme } from "../shared/theme/paperTheme";
import { useEffect } from "react";
import { initDatabase } from "../shared/db/client";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
