import mongoose, { Schema } from 'mongoose';

export const RegistrationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

export const Registration = mongoose.model('Registration', RegistrationSchema);