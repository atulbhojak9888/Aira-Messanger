import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [memories, setMemories] = useState([
    { id: 'm1', category: 'About You', text: 'Full-stack developer', date: '2025-06-27' },
    { id: 'm2', category: 'Preferences', text: 'Prefers React Native', date: '2025-07-01' },
    { id: 'm3', category: 'Conversations', text: "Discussed AiRA startup", date: '2025-10-14' }
  ]);

  const addMessage = (msg) => setMessages((s) => [...s.filter(m=>m.id!=='ai-stream'), msg]);
  const addMemory = (mem) => setMemories((s) => [mem, ...s]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, memories, addMemory }}>
      {children}
    </ChatContext.Provider>
  );
};
