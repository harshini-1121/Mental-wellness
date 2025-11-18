import express from 'express';
import ChatMessage from '../models/ChatMessage';
import { getBotReply } from '../ai/responses';

const router = express.Router();

// POST /chat/message
router.post('/message', async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) return res.status(400).json({ error: 'userId and message required' });

    const botReply = getBotReply(message);

    // Save messages with userId
    await ChatMessage.create({ userId, sender: 'user', message });
    await ChatMessage.create({ userId, sender: 'bot', message: botReply });

    res.json({ bot: botReply });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /chat?userId=...
router.get('/', async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const messages = await ChatMessage.find({ userId }).sort({ timestamp: 1 });
  res.json(messages);
});

export default router;