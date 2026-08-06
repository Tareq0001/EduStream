const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'edustream.db');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      videoUri TEXT,
      thumbnail TEXT,
      duration TEXT
    )`);

    // Insert mock data if empty
    db.get("SELECT COUNT(*) as count FROM courses", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare("INSERT INTO courses (title, description, videoUri, thumbnail, duration) VALUES (?, ?, ?, ?, ?)");
        stmt.run("React Native Animations", "Master Reanimated 3 and create fluid 60fps animations.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop", "45 min");
        stmt.run("Advanced Expo Routing", "Build complex navigation flows with Expo Router.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop", "1h 15m");
        stmt.run("Supabase Backend Magic", "Integrate auth and postgres seamlessly into your app.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", "https://images.unsplash.com/photo-1618477247222-ac60c74773c8?q=80&w=1964&auto=format&fit=crop", "2h 30m");
        stmt.run("UI/UX Masterclass", "Learn the secrets of high-end design for mobile apps.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", "55 min");
        stmt.finalize();
      }
    });
  });
};

module.exports = { db, initDb };
