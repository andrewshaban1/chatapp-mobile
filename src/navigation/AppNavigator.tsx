import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatsScreen from '@/src/screens/ChatsScreen';

export type AppStackParamList = {
  Chats: undefined;
  // ChatRoom: { chatId: string; chatName: string }; // Phase 2
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ title: 'Messages' }}
      />
    </Stack.Navigator>
  );
}
