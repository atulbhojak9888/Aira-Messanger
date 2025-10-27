export function getAiResponse(text) {
  const t = text.toLowerCase();
  if (/\b(hi|hello)\b/.test(t)) {
    return { text: "Hey! Good to see you again. What's on your mind?", memory: null };
  }
  if (/startup|company/.test(t)) {
    return { text: "I remember you're building AiRA. How's that going?", memory: { tag: 'career', note: "Building AiRA" } };
  }
  if (/help|advice/.test(t)) {
    return { text: "I'm here to help. What specifically are you thinking about?", memory: null };
  }
  return { text: "That's interesting. Tell me more about that.", memory: null };
}
