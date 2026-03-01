import Dexie from "dexie";

export default function getDB() {
  const db = new Dexie("YouLyric");
  db.version(1).stores({ videos: "videoID, songTitle, artistName" });

  return db;
}
