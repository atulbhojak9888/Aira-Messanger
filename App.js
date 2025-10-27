import React from 'react';
import { ChatProvider } from './src/context/ChatContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ChatProvider>
      <AppNavigator />
    </ChatProvider>
  );
}
