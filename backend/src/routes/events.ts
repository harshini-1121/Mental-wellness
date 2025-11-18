import express from 'express';
import { Event } from '../models/Event';
import { Registration } from '../models/Registration';
import { User } from '../models/User';
import { auth } from '../middleware/auth';

const router = express.Router();

// List events with registration status for logged-in user
router.get('/', auth, async (req: any, res) => {
  const events = await Event.find().sort({ date: 1 });
  const registrations = await Registration.find({ userId: req.userId });
  const registeredEventIds = registrations
    .map(r => r.eventId)
    .filter((id): id is NonNullable<typeof id> => id != null)
    .map(id => id.toString());
  const eventsWithStatus = events.map(event => ({
    ...event.toObject(),
    isRegistered: registeredEventIds.includes(event._id.toString())
  }));
  res.json(eventsWithStatus);
});


// Create event (admin or for testing)
router.post('/', async (req, res) => {
  const { title, description, date, location, capacity } = req.body;
  const event = await Event.create({ title, description, date, location, capacity });
  res.json(event);
});

// Register user for event
router.post('/:id/register', auth, async (req: any, res) => {
  const eventId = req.params.id;

  // Check if already registered
  const existing = await Registration.findOne({ userId: req.userId, eventId });
  if (existing) {
    return res.json({ ok: true, message: 'Already registered', registrationId: existing._id });
  }

  // Register the user
  const registration = await Registration.create({ userId: req.userId, eventId });
  res.json({ ok: true, message: 'Registered successfully', registrationId: registration._id });
});

export default router;