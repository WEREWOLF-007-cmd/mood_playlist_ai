import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Read moods.json
const moods = JSON.parse(fs.readFileSync("moods.json"));

// Serve index.html at root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST endpoint for mood
app.post("/api/mood", (req, res) => {
  const { mood } = req.body;
  if (moods[mood]) {
    res.json(moods[mood]);
  } else {
    res.json({ error: "Mood not found. Try happy, sad, chill, Energetic or Romantic." });
  }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
