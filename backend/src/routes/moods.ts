import express from 'express';
import { Mood } from '../models/Mood';
import { auth } from '../middleware/auth';

const router = express.Router();

// Add a new mood
router.post('/', auth, async (req: any, res) => {
  try {
    const { mood, note } = req.body;
    const newMood = await Mood.create({ userId: req.userId, mood, note });
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get mood history for logged-in user
router.get('/', auth, async (req: any, res) => {
  try {
    const moods = await Mood.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;