import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { paperTheme } from "../shared/theme/paperTheme";

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
