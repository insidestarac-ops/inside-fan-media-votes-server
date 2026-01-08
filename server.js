const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./votes.json";

function readVotes() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveVotes(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/results", (req, res) => {
  res.json(readVotes());
});

app.post("/vote", (req, res) => {
  const { id } = req.body;
  const votes = readVotes();

  if (!votes[id]) {
    return res.status(400).json({ error: "Candidat inconnu" });
  }

  votes[id].votes++;
  saveVotes(votes);

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Serveur lancé sur le port", PORT)
);
