import { useState } from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { Screen } from "../../shared/ui/Screen";
import { createProfile } from "../../features/profile/profile.service";
import { pickImage } from "../../features/profile/utils/useProfileImage";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setLoading(true);

    try {
      await createProfile({ name, email, imageUri });
      router.replace("/(tabs)/home");
    } catch (e: any) {
      setError(e?.errors?.[0]?.message ?? "Invalid profile details");
    } finally {
      setLoading(false);
    }
  };

  const pick = async () => {
    const uri = await pickImage();
    if (uri) setImageUri(uri);
  };

  return (
    <Screen>
      <Text variant="headlineMedium">Create Profile</Text>

      <View style={{ alignItems: "center", marginTop: 24 }}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 96, height: 96, borderRadius: 48 }}
          />
        ) : null}

        <Button mode="outlined" onPress={pick} style={{ marginTop: 12 }}>
          {imageUri ? "Change Photo" : "Add Photo"}
        </Button>
      </View>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{ marginTop: 24 }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginTop: 16 }}
      />

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>

      <Button
        mode="contained"
        onPress={submit}
        loading={loading}
        disabled={!name || !email}
        style={{ marginTop: 24 }}
      >
        Continue
      </Button>
    </Screen>
  );
}
