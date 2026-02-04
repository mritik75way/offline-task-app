export type NoteLocation = {
  lat: number;
  lng: number;
};

export type Note = {
  id: string;
  userId: string;
  text: string;
  imageUri?: string;
  location?: NoteLocation;
  address?: string;
  createdAt: number;
};
