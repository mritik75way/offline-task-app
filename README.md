# Offline Notes

A React Native note-taking application that works completely offline with multi-user support.

## Features

- Offline-first architecture - all data stored locally
- Multi-user profiles with profile images
- Create and save notes with text, images, and location data
- View all notes organized by user
- User authentication with profile switching
- Persistent storage using AsyncStorage
- Responsive UI built with React Native Paper

## Project Structure

```
offline-notes/
├── app/                      # Expo Router screens and navigation
│   ├── index.tsx            # Splash screen
│   ├── login.tsx            # Login/profile selection screen
│   ├── create-profile.tsx   # Profile creation screen
│   ├── (app)/
│   │   └── create-note.tsx  # Note creation screen
│   ├── (auth)/
│   │   └── create-profile.tsx
│   └── (tabs)/
│       ├── home.tsx         # Home tab with notes list
│       └── profile.tsx      # Profile tab with user info
├── features/
│   ├── notes/               # Note management
│   │   ├── notes.service.ts
│   │   ├── notes.storage.ts
│   │   ├── notes.schema.ts
│   │   ├── types.ts
│   │   └── components/
│   └── profile/             # Profile management
│       ├── profile.service.ts
│       ├── profile.storage.ts
│       ├── profile.schema.ts
│       ├── types.ts
│       └── utils/
├── shared/                  # Shared utilities and components
│   ├── theme/
│   ├── ui/
│   └── utils/
└── android/                 # Android build configuration
```

## Tech Stack

- React Native with Expo
- TypeScript
- React Native Paper for UI components
- Zod for schema validation
- Expo Router for navigation
- AsyncStorage for local data persistence
- Expo Image Picker for photos
- Expo Location for location data

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI installed globally

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on Android:
```bash
cd android
./gradlew assembleDebug
```

## Usage

1. Launch the app - you'll see the splash screen
2. On first use, create a profile with your name and email
3. Optionally add a profile photo
4. Navigate to Home tab to create notes
5. Add notes with text, images, and location information
6. View your profile and switch between multiple profiles from the Profile tab

## Data Storage

All data is stored locally on the device using AsyncStorage:
- Profiles: Multiple user profiles can be created and stored
- Notes: Each note is associated with a specific user profile
- Data persists across app sessions

## Notes Features

Each note can include:
- Text content
- Image attachment
- Geographic location (latitude/longitude)
- Address (reverse-geocoded from coordinates)
- Creation timestamp

## License

MIT
