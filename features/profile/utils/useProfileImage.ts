import * as ImagePicker from "expo-image-picker";

export async function pickImage() {
  const { status } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    allowsEditing: true,
  });

  if (result.canceled) return;

  return result.assets[0].uri;
}
