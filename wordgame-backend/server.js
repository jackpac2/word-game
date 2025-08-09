const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory leaderboard
let leaderboard = [];

// POST /score — submit player score
app.post('/score', (req, res) => {
  const { player, score } = req.body;

  if (!player || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid player or score' });
  }

  // Add new score
  leaderboard.push({ player, score });

  // Sort leaderboard by score (highest first)
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep only top 10
  leaderboard = leaderboard.slice(0, 10);

  res.json({ message: 'Score submitted', leaderboard });
});

// GET /leaderboard — return top scores
app.get('/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
