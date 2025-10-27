import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import ChatScreen from '../screens/ChatScreen';
import MemoryPanel from '../screens/MemoryPanel';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Memory" component={MemoryPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
