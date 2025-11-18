// ai/responses.ts

// 🧘 Your events
const events = [
  { title: 'Morning Yoga', desc: 'Start your day with energy.', location: 'Community Park', date: 'Oct 20, 2025' },
  { title: 'Mindfulness Workshop', desc: 'Learn to be present and calm.', location: 'Wellness Center', date: 'Oct 26, 2025' },
  { title: 'Cooking Class', desc: 'Healthy meals made easy.', location: 'Community Kitchen', date: 'Nov 10, 2025' },
  { title: 'Morning Walk', desc: 'Walk and enjoy nature.', location: 'City Park', date: 'Oct 19, 2025' },
  { title: 'Art Therapy', desc: 'Relax through creativity.', location: 'Art Studio', date: 'Oct 27, 2025' },
  { title: 'Open Mic Night', desc: 'Encourage creativity and self-expression.', location: 'Wellness Center', date: 'Oct 18, 2025' },
];

// 🎵 Example mood music suggestions
const musicList = {
  calm: ['“Weightless” – Marconi Union', '“Bloom” – ODESZA', '“Sunrise Piano” playlist'],
  focus: ['“Lo-Fi Beats” playlist', '“Brain Food” – Spotify', '“Coding Mode” mix'],
  happy: ['“Good Vibes” playlist', '“Walking on Sunshine” – Katrina & The Waves'],
  sad: ['“Comfort Songs” playlist', '“Fix You” – Coldplay'],
};

export const responses: Record<string, string> = {
  // 🌿 General
  hello: "Hey there 👋 I'm your Wellness Assistant. How can I help today?",
  hi: "Hi! 😊 Want to talk or check out an event?",
  thanks: "You're welcome 💛 Always here for you.",
  bye: "See you soon 🌻 Take care!",

  // 💭 Emotions
  sad: "I’m sorry you’re feeling low 💔 Want me to suggest a calming event or song?",
  stress: "Stress can feel heavy 😞 Maybe a yoga session could help?",
  overwhelmed: "Try slowing down with a deep breath 💨 Would you like a mindfulness event?",
  anxiety: "You’re safe. Try a 4-4-4 breathing exercise 🌿",
  panic: "You’re okay 💙 Breathe in 4, hold 4, out 4. Need some calming music?",
  love: "That’s sweet ❤️ Spread the good vibes!",
  fight: "Conflicts are hard 😕 Maybe join Art Therapy to relax a bit?",

  // 💞 Relationships
  parents: "Family conflicts hurt 💬 Maybe express yourself through art or a walk?",
  partner: "Relationships can be tricky 💔 Want to attend something together like Open Mic Night?",
  lonely: "You’re not alone 💛 How about joining the Morning Walk to meet new people?",
  toxic: "Boundaries are powerful 💪 I can share a self-care event for you.",

  // 💤 Lifestyle
  sleep: "Hard to rest? 😴 Try Meditation or the Mindfulness Workshop.",
  habit: "Start small 🌱 A consistent morning routine helps! Yoga maybe?",
  exam: "Breathe in confidence 💫 Take 25-min study breaks and hydrate.",
  money: "Money stress is real 💸 But remember, peace is free — breathe.",

  // 🎵 Music
  music: "Music helps the soul 🎵 Want something calm, happy, or focus-based?",
  calm: `Here’s a few soothing tracks:\n${musicList.calm.join(', ')}`,
  happy: `Try these mood boosters 😄\n${musicList.happy.join(', ')}`,
  focus: `Focus mode? 🧠\n${musicList.focus.join(', ')}`,
  sadmusic: `Soft tunes for healing 💙\n${musicList.sad.join(', ')}`,

  // 📅 Event Info
  yoga: "🧘 Morning Yoga — Oct 20, 2025 at Community Park. A peaceful start to your day!",
  mindfulness: "🧠 Mindfulness Workshop — Oct 26, 2025 at Wellness Center. Calm your mind.",
  cooking: "👩‍🍳 Cooking Class — Nov 10, 2025 at Community Kitchen. Fun and healthy!",
  walk: "🚶 Morning Walk — Oct 19, 2025 at City Park. Nature + fresh air!",
  art: "🎨 Art Therapy — Oct 27, 2025 at Art Studio. Relax through creativity.",
  mic: "🎤 Open Mic Night — Oct 18, 2025 at Wellness Center. Express yourself!",

  // 🚨 Crisis
  hurt: "I'm really worried about you 💔 Please reach out to 988 or someone you trust immediately.",
  suicidal: "You’re not alone. Call 988 or visit befrienders.org for immediate help ❤️",
  abuse: "If you’re unsafe 🚨 call local help or 911 now. You deserve safety and peace.",
};

// 🧠 Find reply by keyword or default
export function getBotReply(message: string): string {
  const lower = message.toLowerCase();

  // Event keywords detection
  for (const ev of events) {
    if (lower.includes(ev.title.toLowerCase().split(' ')[0])) {
      return `📅 ${ev.title} — ${ev.date} at ${ev.location}. ${ev.desc}`;
    }
  }

  // General response keywords
  for (const key in responses) {
    if (lower.includes(key)) return responses[key];
  }

  // Default fallback
  return "Hmm 🤔 I’m not sure about that, but I can tell you about events or help you relax.";
}