import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// ✅ Get music playlist (protected)
router.get('/', auth, async (_req, res) => {
  const playlist = [
    {
      id: 1,
      title: 'Calm Ocean Waves 🌊',
      artist: 'Relax Beats',
      url: 'https://www.example.com/music/ocean.mp3',
    },
    {
      id: 2,
      title: 'Mindful Morning ☀️',
      artist: 'Peaceful Vibes',
      url: 'https://www.example.com/music/morning.mp3',
    },
    {
      id: 3,
      title: 'Deep Focus 🎧',
      artist: 'Concentration Sounds',
      url: 'https://www.example.com/music/focus.mp3',
    },
  ];

  res.json(playlist);
});

export default router;