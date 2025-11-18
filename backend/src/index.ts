import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import eventRoutes from './routes/events';
import moodRoutes from './routes/moods';
import musicRoutes from './routes/music';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Adjust as needed for frontend
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/moods', moodRoutes);
app.use('/music', musicRoutes);
app.use('/api/chat', chatRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Root route
app.get('/', (_req, res) => {
  res.send('🎵 Wellness App API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});