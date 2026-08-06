# EduStream 🎓📺

EduStream is a modern, production-ready React Native (Expo) MVP designed for E-learning and Video Streaming. It provides a seamless mobile experience for users to browse educational content and watch video courses.

## Features ✨
- **Video Streaming:** High-quality, robust video playback using `expo-av`.
- **Backend Ready:** Local Node.js Express server with SQLite database serving mock data.
- **Cross-Platform:** Built with Expo, ready for both iOS and Android.
- **Premium UI:** Highly polished, beautiful dark-themed interface with smooth interactions.

## Tech Stack 🛠️
- **Frontend:** React Native, Expo
- **Video Player:** `expo-av`
- **Backend:** Node.js, Express, SQLite3

## Project Structure 📁
```text
EduStream/
├── App.js                   # Application entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
├── backend/
│   ├── server.js            # Express server
│   └── database.js          # SQLite3 database initialization and seeding
└── src/
    ├── components/
    │   └── VideoPlayer.js   # Reusable video player component
    ├── screens/
    │   └── HomeScreen.js    # Main course listing and player view
    └── services/
```

## Setup Instructions 🚀

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Run Local Backend Server**
   ```bash
   cd backend
   npm install
   node server.js
   ```

3. **Run the App**
   Open a new terminal in the root directory:
   ```bash
   npm start
   ```
   - Press `a` to run on Android.
   - Press `i` to run on iOS.
   - Use the Expo Go app to scan the QR code and test on your physical device.

## License 📄
MIT License
