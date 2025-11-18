import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('ChatMessage', chatMessageSchema);