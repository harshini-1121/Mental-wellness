import mongoose, { Schema } from 'mongoose';

export const MusicSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  artist: String,
  url: { type: String, required: true }, // Can be a local file or external link
}, { timestamps: true });

export const Music = mongoose.model('Music', MusicSchema);
