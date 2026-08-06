# EduStream 🎓📺

EduStream is a modern, production-ready React Native (Expo) MVP designed for E-learning and Video Streaming. It provides a seamless mobile experience for users to browse educational content and watch video courses.

## Features ✨
- **Video Streaming:** High-quality, robust video playback using `expo-av`.
- **Backend Ready:** Pre-configured Supabase integration for authentication, database, and storage.
- **Cross-Platform:** Built with Expo, ready for both iOS and Android.
- **Modern UI:** Clean, responsive, and intuitive user interface.

## Tech Stack 🛠️
- **Frontend:** React Native, Expo
- **Video Player:** `expo-av`
- **Backend (BaaS):** Supabase (PostgreSQL)

## Project Structure 📁
```text
EduStream/
├── App.js                   # Application entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
└── src/
    ├── components/
    │   └── VideoPlayer.js   # Reusable video player component
    ├── screens/
    │   └── HomeScreen.js    # Main course listing and player view
    └── services/
        └── supabase.js      # Supabase client configuration
```

## Setup Instructions 🚀

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   - Create a project on [Supabase](https://supabase.com).
   - Update `src/services/supabase.js` with your project URL and anonymous key.

3. **Run the App**
   ```bash
   npm start
   ```
   - Press `a` to run on Android.
   - Press `i` to run on iOS.
   - Use the Expo Go app to scan the QR code and test on your physical device.

## License 📄
MIT License
