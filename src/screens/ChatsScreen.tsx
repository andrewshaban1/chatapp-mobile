import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuthStore } from '@/src/stores/authstore';

export default function ChatsScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Welcome, {user?.username}!</Text>
      <Text style={styles.subtitle}>Chats will appear here in Phase 2.</Text>
      <TouchableOpacity style={styles.button} onPress={() => void logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
