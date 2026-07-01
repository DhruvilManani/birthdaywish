/**
 * Global Configuration Constants for the Birthday Experience.
 * Adjust these variables to swap out assets, text, or timing sequences.
 */

// A beautiful, premium, slow emotional piano soundtrack
export const BACKGROUND_MUSIC_URL = 'https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-extra-long-1199.mp3';

// Cinematic story text sequence for the Intro Screen
export const INTRO_SENTENCES = [
  'Some people celebrate birthdays with gifts...',
  'I wanted to celebrate yours with memories.',
  'So today...',
  'I built a little universe...',
  'just for you, Betuu ❤️'
];

// Animation speed and durations (in seconds)
export const INTRO_TIMINGS = {
  heartbeatDuration: 4.5, // Time heart beats on screen
  textPauseDuration: 2.0, // Delay before moving to the next sentence
  typewriterSpeed: 0.05,  // Speed of individual character typewriter reveal
};
