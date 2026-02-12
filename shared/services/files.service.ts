import { documentDirectory, getInfoAsync, makeDirectoryAsync, copyAsync, deleteAsync } from "expo-file-system/legacy";

const IMAGES_DIR = documentDirectory + "images/";

async function ensureDirExists() {
  const dirInfo = await getInfoAsync(IMAGES_DIR);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(IMAGES_DIR, { intermediates: true });
  }
}

export async function saveImage(uri: string): Promise<string> {
  await ensureDirExists();

  const filename = uri.split("/").pop();
  if (!filename) throw new Error("Invalid URI");

  const newPath = IMAGES_DIR + filename;

  await copyAsync({
    from: uri,
    to: newPath,
  });

  return newPath;
}

export async function deleteImage(uri: string): Promise<void> {
  if (uri.startsWith(documentDirectory!)) {
    try {
      await deleteAsync(uri, { idempotent: true });
    } catch (e) {
      console.warn("Failed to delete image", e);
    }
  }
}
