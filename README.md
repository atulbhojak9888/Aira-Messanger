# AiRA Mobile — Simplified Chat Experience

A compact Expo React Native demo implementing a simplified **AiRA** chat experience (Authentication, Chat Interface with streaming AI, and Memory Panel).  
This repo is prepared to run locally and to be published to GitHub.

---

## Demo / Short summary
AiRA Mobile simulates an AI conversational assistant with:
- Mock **Authentication** (email/password + show/hide password)
- **Chat screen**: user messages (right), AI messages (left with avatar), **word-by-word streaming**, typing indicator, memory tags on some AI replies
- **Memory Panel**: shows what the AI “remembers” (About You, Preferences, Conversations)

Hardcoded keyword-based responses:
- `hi` / `hello` → `Hey! Good to see you again. What's on your mind?`
- mentions `startup` / `company` → `I remember you're building AiRA. How's that going?` (stores memory; shows tag `Remembered: career`)
- mentions `help` / `advice` → `I'm here to help. What specifically are you thinking about?`
- default → `That's interesting. Tell me more about that.`

---

## Repo structure
```
aira-mobile/
├── App.js
├── app.json
├── package.json
├── README.md              <- this file
├── .gitignore
├── .env.example
├── assets/
│   └── avatar-ai.png
└── src/
    ├── components/
    │   ├── MessageBubble.js
    │   └── TypingIndicator.js
    ├── context/
    │   └── ChatContext.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── AuthScreen.js
    │   ├── ChatScreen.js
    │   └── MemoryPanel.js
    └── utils/
        └── aiLogic.js
```

---

## Requirements
- **Node:** 23.5.0  
- **npm:** 11.1.0  
- **Expo SDK:** 54 
- Recommended: Android Studio (or Xcode) for emulator/simulator

> This repository is configured to avoid peer-dependency conflicts for the versions above.

---

## Quick start (local)

1. **Install dependencies**
```bash
npm install
# If npm reports dependency resolution problems, run:
npm install --legacy-peer-deps
```

2. **Start the Expo dev server**
```bash
npx expo start
```

3. **Open the app**
- `a` — open Android emulator (if configured)  
- `i` — open iOS simulator (macOS)  
- Or scan the QR with Expo Go (ensure Expo Go supports SDK 54)

---

## Login credentials
- **Email:** `test@aira.ai`  
- **Password:** `password`

---

## How AI logic works (brief)
File: `src/utils/aiLogic.js`

1. The user input is lowercased and matched against regex keywords.
2. One of four responses (greeting, startup/company, help/advice, default) is returned.
3. If the response includes memory (for `startup`/`company`) it includes a `memoryTag` and a memory entry is added to the Memory Panel.

**Streaming simulation:** the Chat screen splits the AI response into words and appends them over time (using `setInterval`) to simulate typing. A temporary message id (`ai-stream`) is used during streaming; final message replaces/persists at the end.

---

## Architecture & design choices

- **Framework:** Expo (React Native) — fast setup and hot reload for demos.
- **State management:** React Context + `useState` — lightweight and appropriate for this small demo (messages + memories).
- **Navigation:** React Navigation (native stack).
- **Styling:** React Native `StyleSheet` for predictable, minimal styling.
- **No backend:** All AI logic and memory are hardcoded in `src/utils/aiLogic.js` and `ChatContext`.

---