import mongoose, { Schema } from 'mongoose';

export const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  capacity: Number,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // ✅ optional
}, { timestamps: true });

export const Event = mongoose.model('Event', EventSchema);